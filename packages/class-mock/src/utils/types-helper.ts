/* eslint-disable @typescript-eslint/no-explicit-any */
export type Nil = null | undefined
export type Fn = (...args: any[]) => any
export type MetadataTarget = Function
export type PropertyMetadataMap<T> = Map<string, T>
export type TargetMap<T> = Map<MetadataTarget, PropertyMetadataMap<T>>

export interface BasePropertyConfig {
  partial?: boolean | Nil
  groups?: string[] | Nil
  array?: boolean
  length?: number | Nil
  max?: number | Nil
  min?: number | Nil
}

export interface FakerPropertyDecoratorConfig extends BasePropertyConfig {
  alwaysRandom?: boolean | Nil
}

export type EntityPropertyConfig = BasePropertyConfig

export interface ClassDecoratorConfig {
  partial?: boolean | Nil
  alwaysRandom?: boolean | Nil
}

export interface BaseMetadata {
  target: MetadataTarget
  propertyName: string
}

export interface BasePropertyMetadata extends BaseMetadata, BasePropertyConfig {}

export interface FakerPropertyMetadata<T extends Fn = Fn> extends BasePropertyMetadata, FakerPropertyDecoratorConfig {
  fakerFn: T
  fakerParams: Parameters<T>
}

export interface EntityPropertyMetadata extends BasePropertyMetadata, EntityPropertyConfig {
  entityFn: Fn
}

export type MockPropertyDecorator<T extends BasePropertyConfig> = PropertyDecorator & {
  config(config?: T): PropertyDecorator
}
