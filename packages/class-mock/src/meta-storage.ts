import {
  BaseMetadata,
  EntityPropertyMetadata,
  FakerPropertyMetadata,
  TargetMap,
  MetadataTarget
} from './utils/types-helper'

export class MetadataUtils<Meta extends BaseMetadata> {
  private _ancestorsMap = new Map<MetadataTarget, Function[]>()

  /**
   * clear constructors map
   */
  public clear(): void {
    this._ancestorsMap.clear()
  }

  /**
   * save metadata to target map's property map
   * @param constructMap constructor map Map<constructor, Map<propertyName, metadata>>
   * @param metadata metadata
   */
  public setMetadata<T extends Meta>(constructMap: TargetMap<T>, metadata: T): void {
    const {target, propertyName} = metadata

    if (!constructMap.has(target)) {
      constructMap.set(target, new Map<string, T>())
    }
    constructMap.get(target)!.set(propertyName, metadata)
  }

  /**
   * save metadatas to target map's property map
   * @param constructMap constructor map Map<constructor, Map<propertyName, metadata[]>>
   * @param metadata metadata
   */
  public setMetadatas<T extends Meta>(constructMap: TargetMap<T[]>, metadata: T): void {
    const {target, propertyName} = metadata

    if (!constructMap.has(target)) {
      constructMap.set(target, new Map<string, T[]>())
    }
    const propertyMap = constructMap.get(target)!
    const metadatas = propertyMap.get(propertyName) ?? []
    propertyMap.set(propertyName, [...metadatas, metadata])
  }

  /**
   * Returns all the metadatas of the given target.(filter by propertyName if not undefined)
   * @param constructMap constructor map Map<constructor, Map<propertyName, metadata>>
   * @param target target constructor
   * @returns metadatas
   */
  public getMetadatas<T extends Meta>(constructMap: TargetMap<T>, target: MetadataTarget): T[] {
    const ancestorsMetas: T[] = []
    const ancestors = [...this.getAncestors(target), target]

    for (const ancestor of ancestors) {
      const ancestorMetas = Array.from(constructMap.get(ancestor)?.values() ?? []).filter(
        meta => meta.propertyName !== undefined
      )
      ancestorsMetas.push(...ancestorMetas)
    }
    return ancestorsMetas
  }

  /**
   * .
   * @param constructMap constructor map Map<constructor, Map<propertyName, metadata>>
   * @param target target constructor
   * @param propertyName property name
   * @returns metadata or undefined
   */
  public findMetadata<T extends Meta>(
    constructMap: TargetMap<T>,
    target: MetadataTarget,
    propertyName: string
  ): T | undefined {
    const ancestors = [target, ...this.getAncestors(target)]

    for (const ancestor of ancestors) {
      const ancestorPropMeta: T | undefined = constructMap.get(ancestor)?.get(propertyName)
      if (ancestorPropMeta) return ancestorPropMeta
    }
    return undefined
  }

  /**
   * find metadatas from target and its ancestors
   * @param constructMap constructor map Map<constructor, Map<propertyName, metadata[]>>
   * @param target target constructor
   * @param propertyName property name
   * @returns metadatas
   */
  public findMetadatas<T extends Meta>(
    constructMap: TargetMap<T[]>,
    target: MetadataTarget,
    propertyName: string
  ): T[] {
    const targetPropMetas: T[] = constructMap.get(target)?.get(propertyName) ?? []
    const ancestorsPropMetas: T[] = []
    const ancestors = this.getAncestors(target)

    for (const ancestor of ancestors) {
      const ancestorPropMetas = constructMap.get(ancestor)?.get(propertyName) ?? []
      ancestorsPropMetas.push(...ancestorPropMetas)
    }

    return [...ancestorsPropMetas.reverse(), ...targetPropMetas.reverse()]
  }

  /**
   * Returns all the parent's class constructor of target class
   * @param target target class
   * @returns all parent's constructor of target
   */
  private getAncestors(target: MetadataTarget): Function[] {
    if (!target) return []
    if (!this._ancestorsMap.has(target)) {
      const ancestors: Function[] = []

      for (
        let baseClass = Object.getPrototypeOf(target.prototype.constructor);
        typeof baseClass.prototype !== 'undefined';
        baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)
      ) {
        ancestors.push(baseClass)
      }
      this._ancestorsMap.set(target, ancestors)
    }
    return this._ancestorsMap.get(target) ?? []
  }
}

/**
 * Storage all library metadata.
 */
export class MetadataStorage {
  static _instance: MetadataStorage
  static get instance(): MetadataStorage {
    if (!MetadataStorage._instance) {
      MetadataStorage._instance = new MetadataStorage()
    }
    return MetadataStorage._instance
  }

  private _fakerMockConstructMap: TargetMap<FakerPropertyMetadata> = new Map()
  private _entityMockConstructMap: TargetMap<EntityPropertyMetadata> = new Map()
  private _metadataUtils = new MetadataUtils()

  addFakerMetadata(metadata: FakerPropertyMetadata): void {
    this._metadataUtils.setMetadata(this._fakerMockConstructMap, metadata)
  }

  addEntityMetadata(metadata: EntityPropertyMetadata): void {
    this._metadataUtils.setMetadata(this._entityMockConstructMap, metadata)
  }

  findFakerMetadata(target: MetadataTarget, propertyName: string): FakerPropertyMetadata | undefined {
    return this._metadataUtils.findMetadata(this._fakerMockConstructMap, target, propertyName)
  }

  findEntityMetadata(target: MetadataTarget, propertyName: string): EntityPropertyMetadata | undefined {
    return this._metadataUtils.findMetadata(this._entityMockConstructMap, target, propertyName)
  }

  getClassMetadatas(target: Function): Array<FakerPropertyMetadata | EntityPropertyMetadata> {
    const fakerMetas = this._metadataUtils.getMetadatas(this._fakerMockConstructMap, target)
    const entityMetas = this._metadataUtils.getMetadatas(this._entityMockConstructMap, target)

    return [...fakerMetas, ...entityMetas]
  }

  clear(): void {
    this._fakerMockConstructMap.clear()
    this._entityMockConstructMap.clear()
    this._metadataUtils.clear()
  }
}
