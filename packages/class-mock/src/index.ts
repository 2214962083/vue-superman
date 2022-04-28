/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata'
import faker from '@faker-js/faker'
import {PropertyDecoratorConfig, ClassDecoratorConfig} from './utils/types-helper'

const METADATA_KEY_MOCK = 'mock'

function FakerDecorator<T extends (...args: any[]) => any>(
  fakerFn: T,
  ...fakerParams: Parameters<T>
): PropertyDecorator & {
  config(config?: PropertyDecoratorConfig): PropertyDecorator
} {
  function decorator(target: Object, propertyKey: string | symbol, config: PropertyDecoratorConfig = {}) {
    const metadata: {
      fakerFn: T
      fakerParams: Parameters<T>
      config: PropertyDecoratorConfig
    } = {
      fakerFn,
      fakerParams,
      config
    }
    let classMetadata = Reflect.getOwnMetadata(METADATA_KEY_MOCK, target)
    if (!classMetadata) classMetadata = {}
    if (!classMetadata.property) classMetadata.property = {}
    classMetadata.property[propertyKey] = metadata
    Reflect.defineMetadata(METADATA_KEY_MOCK, classMetadata, target)
    Reflect.defineMetadata(propertyKey, metadata, target, propertyKey)
  }

  decorator.config = (config: PropertyDecoratorConfig) => (target: Object, propertyKey: string | symbol) =>
    decorator(target, propertyKey, config)

  return decorator
}

function Mock(config: ClassDecoratorConfig = {}): ClassDecorator {
  function decorator<TFunction extends Function>(target: TFunction): TFunction | void {
    const metadata: {
      config: PropertyDecoratorConfig
    } = {
      config
    }
    Reflect.defineMetadata(METADATA_KEY_MOCK, metadata, target)
  }
  return decorator
}

interface MockClass<T = any> {
  new (...args: any[]): T
}

function createMock<T = any>(target: MockClass<T>): T {
  const classMetadata = Reflect.getOwnMetadata(METADATA_KEY_MOCK, target)
  const metadataKeys = Reflect.getMetadataKeys(target)

  return '' as any as T
}

@Mock()
class User {
  @FakerDecorator(faker.random.number, {min: 0, max: 100}).config({
    alwaysRandom: true
  })
  age!: number
}
