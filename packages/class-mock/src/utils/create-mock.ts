/* eslint-disable @typescript-eslint/no-explicit-any */
import {CLASS_META_KEY} from '@/constants/meta.constants'
import faker from '@faker-js/faker'
import {getGenerateArrayLength, IsGroupsIntersect, randomBoolean} from './common'
import {MetadataStorage} from './meta-storage'
import {BaseClass, BasePropertyConfig, MockPropertyMetadata} from './types-helper'

export interface CreateMockOptions<IsArray extends boolean = false> extends Omit<BasePropertyConfig, 'partial'> {
  /**
   * if true, will generate an array
   * @default false
   */
  array?: IsArray

  /**
   * seed for generating same random value
   */
  seed?: number | number[]
}

export function createMock<T extends BaseClass, IsArray extends boolean = false>(
  Entity: T,
  options: CreateMockOptions<IsArray> = {}
): IsArray extends false ? T : T[] {
  if (options.seed) {
    faker.seed(options.seed)
    delete options.seed
  }
  if (!options.array) {
    const metas = MetadataStorage.instance.getClassMetadatas(Entity)
    const entity = new Entity()
    metas.map(meta => {
      const {
        target,
        propertyName,
        alwaysRandom: _alwaysRandom,
        randomResult,
        partialResult,
        partial,
        groups,
        array = false,
        mockFn,
        entityFn
      } = meta
      if (propertyName === CLASS_META_KEY) return
      const exclude = partial === 'exclude' || !IsGroupsIntersect(options.groups, groups)
      const maybePartial = partial === 'partial' || partial === true
      const alwaysRandom = options.alwaysRandom ?? _alwaysRandom ?? true

      const updateMeta = (newMeta: Partial<MockPropertyMetadata>) => {
        MetadataStorage.instance.updateMockMetadata(target, propertyName, newMeta)
      }

      const createSingleValue = (metadata: MockPropertyMetadata): T | undefined => {
        const {entityFn, mockFn, mockParams = [], array = false, ...otherOptions} = metadata
        if (array) return undefined
        if (typeof mockFn === 'function') {
          return mockFn(...mockParams)
        } else if (typeof entityFn === 'function') {
          const PropertyEntity = entityFn()
          return createMock(PropertyEntity, {
            ...otherOptions,
            array: false
          })
        }
        return undefined
      }

      const createListValue = (metadata: MockPropertyMetadata): T[] | undefined => {
        const {entityFn, mockFn, mockParams = [], array = false, max, min, length, ...otherOptions} = metadata
        if (!array) return undefined
        if (typeof mockFn === 'function') {
          const arrayLength = getGenerateArrayLength({length, min, max})
          return Array.from({length: arrayLength}, () => mockFn(...mockParams))
        } else if (typeof entityFn === 'function') {
          const PropertyEntity = entityFn()
          return createMock(PropertyEntity, {
            ...otherOptions,
            array: true,
            length,
            min,
            max
          })
        }
        return undefined
      }

      if (exclude) return delete entity[propertyName]

      if (typeof mockFn !== 'function' && typeof entityFn !== 'function') return

      let propertyValue: unknown

      if (!alwaysRandom && randomResult !== undefined) {
        propertyValue = randomResult
        entity[propertyName] = propertyValue
        return
      }

      if (maybePartial) {
        const shouldCreate = alwaysRandom ? randomBoolean() : partialResult ?? randomBoolean()
        updateMeta({partialResult: shouldCreate})
        if (!shouldCreate) return delete entity[propertyName]
      }

      const newMeta: MockPropertyMetadata = {
        ...meta,
        groups: options.groups,
        alwaysRandom
      }
      propertyValue = !array ? createSingleValue(newMeta) : createListValue(newMeta)
      updateMeta({randomResult: propertyValue})
      entity[propertyName] = propertyValue
    })
    return entity
  } else {
    const {length, max, min, ...otherOptions} = options
    const arrayLength = getGenerateArrayLength({length, min, max})
    return Array.from({length: arrayLength}, () => createMock<T, false>(Entity, {...otherOptions, array: false})) as any
  }
}
