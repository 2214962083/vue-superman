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
   * 默认为 undefined
   * 数组的最小长度，如果定义了 max ，则 min 默认为 0
   * 在 array 为 true 时生效
   */
  min?: number | undefined | null

  /**
   * 默认为 undefined
   * 数组的最大长度，如果定义了 min ，则 max 默认为 50
   * 在 array 为 true 时生效
   */
  max?: number | undefined | null
}
```

## @Config

设置属性元数据（配置数据）

```ts
function Config(config: BasePropertyConfig): PropertyDecorator
```

<br/>
使用示例：

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

设置属性的元数据（配置数据）的 `partial` 属性为 `partial`。

## @IsInclude

设置属性的元数据（配置数据）的 `partial` 属性为 `include`。

## @IsExclude

设置属性的元数据（配置数据）的 `partial` 属性为 `exclude`。

## @IsAlwaysRandom

设置属性的元数据（配置数据）的 `alwaysRandom` 属性为 `true`。

## @IsNotAlwaysRandom

设置属性的元数据（配置数据）的 `alwaysRandom` 属性为 `false`。

## @IsArray

设置属性的元数据（配置数据）的 `array` 属性为 `true`。

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

设置属性的元数据（配置数据）的 `array` 属性为 `false`。

## @Groups

设置属性的元数据（配置数据）的 `groups` 属性。

```ts
function Groups(groups: string[] | undefined | null): PropertyDecorator
```

## 链式调用

每个属性装饰器都支持链式调用，以下四个 `Student` 是等效的：

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
