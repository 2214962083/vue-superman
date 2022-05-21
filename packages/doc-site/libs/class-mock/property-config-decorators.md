# 配置装饰器

[[toc]]

## 属性的元数据（配置数据）

属性的元数据（配置数据）结构如下:

```ts
interface BasePropertyConfig {
  /**
   * 默认为 'auto'
   * 'auto' | undefined | null: 不干扰该属性的存在与否，但 class 的元数据 partial 可以覆盖它
   * 'partial' | true: 强制从 mock 结果中随机删除该属性
   * 'include' | false: 强制从 mock 结果中包含该属性
   * 'exclude': 强制从 mock 结果中删除该属性
   * @default 无
   */
  partial?: 'auto' | 'include' | 'exclude' | 'partial' | boolean | undefined | null

  /**
   * 默认为 true
   * false: 强制该属性复用第一次生成的随机值
   * true: 强制该属性每次都生成新的随机值
   */
  alwaysRandom?: boolean

  /**
   * 默认为 undefined
   * 该属性仅在这些组中生成，组将由 createMock 提供
   */
  groups?: string[] | undefined | null

  /**
   * 默认为 false
   * true: 该属性是一个数组
   * false: 该属性是一个非数组值
   */
  array?: boolean

  /**
   * 默认为 10
   * 数组长度
   * 在 array 为 true 时生效
   * 若 min 或 max 存在，则本属性无效
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
