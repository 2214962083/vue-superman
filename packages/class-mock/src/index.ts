/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import faker from '@faker-js/faker'
import {MetadataStorage} from './meta-storage'
import {FakerDecorator} from './decorators/faker.decorator'
import {valueIsFakerMeta} from './utils/common'

class User {
  @FakerDecorator(faker.name.firstName, 'male').config({
    partial: true
  })
  name!: string

  @FakerDecorator(faker.random.number, {min: 0, max: 100}).config({
    alwaysRandom: true
  })
  age!: number
}

class Student extends User {
  @FakerDecorator(faker.random.words, 5).config({
    array: true,
    length: 3
  })
  favorites!: string[]
}

function createMock(Entity: any) {
  const metas = MetadataStorage.instance.getClassMetadatas(Entity)
  const entity = new Entity()
  metas.map(meta => {
    const {array = false, length, min, max, propertyName} = meta
    if (valueIsFakerMeta(meta)) {
      const {fakerFn, fakerParams} = meta
      let propertyValue: any
      if (!array) {
        propertyValue = fakerFn(...fakerParams)
      } else {
        const arrayLength =
          (length ?? min ?? max ?? undefined) === undefined
            ? 10
            : length ?? faker.random.number({min: min ?? 0, max: max ?? 100})
        propertyValue = Array.from({length: arrayLength}, () => fakerFn(...fakerParams))
      }
      entity[propertyName] = propertyValue
    }
  })
  return entity
}

const mockStudent = createMock(Student)

console.log('mockStudent: ', mockStudent)
