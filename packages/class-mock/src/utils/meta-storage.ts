import {CLASS_META_KEY} from '@/constants/meta.constants'
import {mergeConfig} from './common'
import {BaseMetadata, MockPropertyMetadata, TargetMap, MetadataTarget} from './types-helper'

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

      // if class.prototype not be undefined
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

  private _mockMockConstructMap: TargetMap<MockPropertyMetadata> = new Map()
  private _metadataUtils = new MetadataUtils()

  setMockMetadata(metadata: MockPropertyMetadata): void {
    this._metadataUtils.setMetadata(this._mockMockConstructMap, metadata)
  }

  updateMockMetadata(target: MetadataTarget, propertyName: string, metadata: Partial<MockPropertyMetadata>): void {
    // const {target, propertyName} = metadata
    const oldMeta = this.findMockMetadata(target, propertyName)
    const newMockMeta = mergeConfig(oldMeta, {target, propertyName, ...metadata} as MockPropertyMetadata)
    this.setMockMetadata(newMockMeta)
  }

  findMockMetadata(target: MetadataTarget, propertyName: string): MockPropertyMetadata | undefined {
    return this._metadataUtils.findMetadata(this._mockMockConstructMap, target, propertyName)
  }

  mergeAllPropertyMockMetadata<MergeMeta extends Partial<MockPropertyMetadata>>(
    target: MetadataTarget,
    metadata: MergeMeta,
    updateFn?: (oldMeta: MockPropertyMetadata, mergeMeta: MergeMeta) => void
  ): void {
    const metas = this.getClassMetadatas(target)
    metas.map(meta => {
      const {propertyName} = meta
      if (propertyName === CLASS_META_KEY) return
      if (updateFn) {
        updateFn(meta, metadata)
      } else {
        this.updateMockMetadata(target, propertyName, metadata)
      }
    })
  }

  getClassMetadatas(target: Function): Array<MockPropertyMetadata> {
    const mockMetas = this._metadataUtils.getMetadatas(this._mockMockConstructMap, target)

    return [...mockMetas]
  }

  clear(): void {
    this._mockMockConstructMap.clear()
    this._metadataUtils.clear()
  }
}
