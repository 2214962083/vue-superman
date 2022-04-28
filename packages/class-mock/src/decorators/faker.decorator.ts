/* eslint-disable @typescript-eslint/no-explicit-any */
import {MetadataStorage} from './../meta-storage'
import {FakerPropertyDecoratorConfig, FakerPropertyMetadata, Fn, MockPropertyDecorator} from './../utils/types-helper'

export function FakerDecorator<T extends Fn>(fakerFn: T, ...fakerParams: Parameters<T>) {
  function decorator(target: any, propertyKey: string, config: FakerPropertyDecoratorConfig = {}) {
    const metadata: FakerPropertyMetadata<T> = {
      target: target instanceof Function ? target : target.constructor,
      propertyName: propertyKey,
      fakerFn,
      fakerParams,
      ...config
    }

    MetadataStorage.instance.addFakerMetadata(metadata)
  }

  decorator.config =
    (config: FakerPropertyDecoratorConfig = {}) =>
    (target: any, propertyKey: string) =>
      decorator(target, propertyKey, config)

  return decorator as MockPropertyDecorator<FakerPropertyDecoratorConfig>
}
