/* eslint-disable @typescript-eslint/no-explicit-any */
import {getGenerateArrayLength} from './common'
import {MetadataStorage} from './meta-storage'

export function createMock(Entity: any) {
  const metas = MetadataStorage.instance.getClassMetadatas(Entity)
  const entity = new Entity()
  metas.map(meta => {
    const {array = false, length, min, max, propertyName, mockFn, mockParams = []} = meta
    if (typeof mockFn === 'function') {
      let propertyValue: unknown
      if (!array) {
        propertyValue = mockFn(...mockParams)
      } else {
        const arrayLength = getGenerateArrayLength({length, min, max})
        propertyValue = Array.from({length: arrayLength}, () => mockFn(...mockParams))
      }
      entity[propertyName] = propertyValue
    }
  })
  return entity
}
