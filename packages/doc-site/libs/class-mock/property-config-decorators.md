# Configure decorators

[[toc]]

## Metadata for properties (configuration)

The metadata (configuration) structure of properties is as follows:

```ts
interface BasePropertyConfig {
  /**
   * @default 'auto'
   * 'auto' | undefined | null: Does not interfere with the presence or absence of this attribute, but the class metadata partial can override it
   * 'partial' | true: force the property to be randomly removed from the mock result
   * 'include' | false: Force this property to be included from the mock result
   * 'exclude': Force the property to be removed from the mock result
   */
  partial?: 'auto' | 'include' | 'exclude' | 'partial' | boolean | undefined | null

  /**
   * @default true
   * false: Force this property to reuse the random value generated the first time
   * true: Force this property to generate a new random value every time
   */
  alwaysRandom?: boolean

  /**
   * @default undefined
   * The property is only generated in these groups, the groups will be provided by createMock
   */
  groups?: string[] | undefined | null

  /**
   * @default false
   * true: The property is an array
   * false: The property is a non-array value
   */
  array?: boolean

  /**
   * @default 10
   * array length
   * Takes effect when array is true
   * If min or max exist, this property has no effect
   */
  length?: number | undefined | null

  /**
   * @default undefined
   * The minimum length of the array, if max is defined, min defaults to 0
   * Takes effect when array is true
   */
  min?: number | undefined | null

  /**
   * @default undefined
   * The maximum length of the array, if min is defined, max defaults to 50
   * Takes effect when array is true
   */
  max?: number | undefined | null
}
```

## @Config

Set property metadata (configuration)

```ts
function Config(config: BasePropertyConfig): PropertyDecorator
```

Example:

```ts
import {Config, Random} from 'class-mock'

class Student {
  @Config({
    alwaysRandom: true
  })
  @Random.words(5)
  name?: string

  @Config({
    groups: ['showAge']
  })
  @Random.number()
  age!: number

  @Config({
    array: true,
    length: 3
  })
  @Random.words(5)
  like?: string[]
}

createMock(Student, {
  groups: ['showAge']
}) // { name: 'xxx', age: 18, like: ['xxx', 'xxx', 'xxx'] }

createMock(Student) // { name: 'xxx', like: ['xxx', 'xxx', 'xxx'] }
```

## @IsPartial

Set the `partial` of the property's metadata (configuration) to `partial`.

## @IsInclude

Set the `partial` of the property's metadata (configuration) to `include`.

## @IsExclude

Set the `partial` of the property's metadata (configuration) to `exclude`.

## @IsAlwaysRandom

Set the `alwaysRandom` of the property's metadata (configuration) to `true`.

## @IsNotAlwaysRandom

Set the `alwaysRandom` of the property's metadata (configuration) to `false`.

## @IsArray

Set the `array` of the property's metadata (configuration) to `true`.

```ts
interface ArrayConfig {
  length?: number | undefined | null
  min?: number | undefined | null
  max?: number | undefined | null
}

function IsArray(length?: number): PropertyDecorator
function IsArray(arrayConfig?: ArrayConfig): PropertyDecorator
```

## @IsNotArray

Set the `array` of the property's metadata (configuration) to `false`.

## @Groups

Set the `groups` of the property's metadata (configuration).

```ts
function Groups(groups: string[] | undefined | null): PropertyDecorator
```

## Chain call

Each property decorator supports chaining call, the following four `Student` are equivalent:

```ts
import {IsAlwaysRandom, IsPartial, IsNotArray, Groups, Config, Random} from 'class-mock'

class Student0 {
  @IsAlwaysRandom()
  @IsPartial()
  @IsNotArray()
  @Groups(['showName'])
  @Random.words(5)
  name?: string
}

class Student1 {
  @Random.words(5)
    .config({
      alwaysRandom: true
    })
    .isPartial()
    .isNotArray()
    .groups(['showName'])
  name?: string
}

class Student2 {
  @Config({
    alwaysRandom: true,
    partial: 'partial',
    array: false,
    groups: ['showName']
  })
  @Random.words(5)
  name?: string
}

class Student3 {
  @Random.words(5).config({
    alwaysRandom: true,
    partial: 'partial',
    array: false,
    groups: ['showName']
  })
  name?: string
}
```
