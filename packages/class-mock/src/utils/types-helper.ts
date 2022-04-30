/* eslint-disable @typescript-eslint/no-explicit-any */
export type Nil = null | undefined
export type Fn = (...args: any[]) => any
export type BaseClass = {
  new (...args: any[]): any
}
export type MetadataTarget = Function
export type PropertyMetadataMap<T> = Map<string, T>
export type TargetMap<T> = Map<MetadataTarget, PropertyMetadataMap<T>>
export type ConfigPartial = 'partial' | 'exclude' | 'include' | 'auto' | boolean | Nil

export interface ArrayConfig {
  /**
   * length of array
   * @default 10
   */
  length?: number | Nil

  /**
   * min length of array, if max is defined, min will default be 0
   */
  max?: number | Nil

  /**
   * max length of array, if min is defined, max will default be 50
   */
  min?: number | Nil
}

export interface BasePropertyConfig extends ArrayConfig {
  /**
   * if Nil or auto, value will be included in mock result, class's config partial will cover it
   * if partial or true, random delete property from result
   * if include or false, property will be included in mock result
   * if exclude, property will be excluded from mock result (delete property from result)
   * @default Nil
   */
  partial?: ConfigPartial

  /**
   * if true, value will be always generate random value
   * if false, value will be generate random value once, and then value will be same
   * @default true
   */
  alwaysRandom?: boolean | undefined

  /**
   * @TODO
   * property only generate in these groups, groups will provide by createMock
   * @default undefined
   */
  groups?: string[] | undefined

  /**
   * if true, value will be an array
   * if false, value will be a single value
   * @default false
   */
  array?: boolean
}

export type MockPropertyDecoratorConfig = BasePropertyConfig

export interface ClassDecoratorConfig {
  /**
   * if Nil or auto, will never cover property config partial
   * if partial or true, random delete property from result, will cover class's properties partial when it's auto or Nil
   * if include or false, property will be included in mock result, will cover class's properties partial when it's auto or Nil
   * if exclude, property will be excluded from mock result (delete property from result), will cover class's properties partial when it's auto or Nil
   * @default Nil
   */
  partial?: ConfigPartial | Nil

  /**
   * if true, value will be always generate random value, will cover class's properties alwaysRandom when it's undefined
   * if false, value will be generate random value once, and then value will be same, will cover class's properties alwaysRandom when it's undefined
   * @default true
   */
  alwaysRandom?: boolean | undefined
}

export interface BaseMetadata {
  /**
   * class constructor function
   */
  target: MetadataTarget

  /**
   * class property name
   */
  propertyName: string
}

export interface BasePropertyMetadata extends BaseMetadata, BasePropertyConfig {
  /**
   * if not alwaysRandom, save random result
   */
  randomResult?: any

  /**
   * if partial is true or 'partial' and alwaysRandom is false, save partial resultS
   */
  partialResult?: boolean
}

export interface MockPropertyMetadata<T extends Fn = Fn> extends BasePropertyMetadata, MockPropertyDecoratorConfig {
  /**
   * custom function for return mock value
   */
  mockFn?: T

  /**
   * custom function's params
   */
  mockParams?: Parameters<T>

  /**
   * when value's type is other Class, should provide an entityFn return that class
   */
  entityFn?: Fn
}

export type GetMetadataConfig<T extends BasePropertyConfig> = Omit<T, keyof BaseMetadata>

export interface MockPropertyDecoratorProps<T extends BasePropertyConfig> {
  /**
   * set property decorator config
   * @param config config for property decorator
   */
  config(config?: T): MockPropertyDecorator<T>

  /**
   * set metadata.partial to 'partial'
   */
  isPartial(): MockPropertyDecorator<T>

  /**
   * set metadata.partial to 'include'
   */
  isInclude(): MockPropertyDecorator<T>

  /**
   * set metadata.partial to 'exclude'
   */
  isExclude(): MockPropertyDecorator<T>

  /**
   * set metadata.alwaysRandom to true
   */
  isAlwaysRandom(): MockPropertyDecorator<T>

  /**
   * set metadata.alwaysRandom to false
   */
  isNotAlwaysRandom(): MockPropertyDecorator<T>

  /**
   * set metadata.array to true
   * @param length length of array, default is 10
   */
  isArray(length?: number): MockPropertyDecorator<T>

  /**
   * set metadata.array to true
   * @param arrayConfig array config
   */
  isArray(arrayConfig?: ArrayConfig | number): MockPropertyDecorator<T>

  /**
   * set metadata.array to false
   */
  isNotArray(): MockPropertyDecorator<T>

  /**
   * set metadata.groups to groups
   * @param groups property only generate in these groups, groups will provide by createMock
   */
  groups(groups: string[]): MockPropertyDecorator<T>
}
export interface MockPropertyDecorator<T extends BasePropertyConfig>
  extends PropertyDecorator,
    MockPropertyDecoratorProps<T> {}

export interface MockClassDecoratorProps<T extends ClassDecoratorConfig> {
  /**
   * random delete property from result, will cover class's properties partial when it's auto or Nil
   */
  DefaultPartial(): MockClassDecorator<T>

  /**
   * property will be included in mock result, will cover class's properties partial when it's auto or Nil
   */
  DefaultInclude(): MockClassDecorator<T>

  /**
   * property will be excluded from mock result (delete property from result), will cover class's properties partial when it's auto or Nil
   */
  DefaultExclude(): MockClassDecorator<T>

  /**
   * value will be always generate random value, will cover class's properties alwaysRandom when it's undefined
   */
  DefaultAlwaysRandom(): MockClassDecorator<T>

  /**
   * value will be generate random value once, and then value will be same, will cover class's properties alwaysRandom when it's undefined
   */
  DefaultNotAlwaysRandom(): MockClassDecorator<T>
}
export interface MockClassDecorator<T extends ClassDecoratorConfig>
  extends ClassDecorator,
    MockClassDecoratorProps<T> {}
