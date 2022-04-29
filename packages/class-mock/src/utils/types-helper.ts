/* eslint-disable @typescript-eslint/no-explicit-any */
export type Nil = null | undefined
export type Fn = (...args: any[]) => any
export type MetadataTarget = Function
export type PropertyMetadataMap<T> = Map<string, T>
export type TargetMap<T> = Map<MetadataTarget, PropertyMetadataMap<T>>
export type ConfigPartial = 'partial' | 'exclude' | 'include' | 'auto' | boolean | Nil

export interface ArrayConfig {
  length?: number | Nil
  max?: number | Nil
  min?: number | Nil
}

export interface BasePropertyConfig extends ArrayConfig {
  /**
   * default value is Nil
   * if Nil or auto, value will be included in mock result, class's config partial will cover it
   * if partial or true, random delete property from result
   * if include or false, property will be included in mock result
   * if exclude, property will be excluded from mock result (delete property from result)
   */
  partial?: ConfigPartial
  alwaysRandom?: boolean | Nil
  groups?: string[] | Nil
  array?: boolean
}

export type MockPropertyDecoratorConfig = BasePropertyConfig

export interface ClassDecoratorConfig {
  /**
   * default value is Nil
   * if Nil or auto, will never cover property config partial
   * if partial or true, random delete property from result
   * if include or false, property will be included in mock result
   * if exclude, property will be excluded from mock result (delete property from result)
   */
  partial?: ConfigPartial | Nil
  alwaysRandom?: boolean | Nil
}

export interface BaseMetadata {
  target: MetadataTarget
  propertyName: string
}

export interface BasePropertyMetadata extends BaseMetadata, BasePropertyConfig {}

export interface MockPropertyMetadata<T extends Fn = Fn> extends BasePropertyMetadata, MockPropertyDecoratorConfig {
  mockFn?: T
  mockParams?: Parameters<T>
  entityFn?: Fn
}

export type GetMetadataConfig<T extends BasePropertyConfig> = Omit<T, keyof BaseMetadata>

export interface MockPropertyDecoratorProps<T extends BasePropertyConfig> {
  config(config?: T): MockPropertyDecorator<T>
  isPartial(): MockPropertyDecorator<T>
  isInclude(): MockPropertyDecorator<T>
  isExclude(): MockPropertyDecorator<T>
  isAlwaysRandom(): MockPropertyDecorator<T>
  isNotAlwaysRandom(): MockPropertyDecorator<T>
  isArray(arrayConfig: ArrayConfig): MockPropertyDecorator<T>
  isNotArray(): MockPropertyDecorator<T>
  groups(groups: string[]): MockPropertyDecorator<T>
}
export interface MockPropertyDecorator<T extends BasePropertyConfig>
  extends PropertyDecorator,
    MockPropertyDecoratorProps<T> {}
