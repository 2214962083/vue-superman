# Class Decorators

[[toc]]

## Class Metadata (configuration)

The metadata (configuration) structure of the class is as follows:

```ts
interface ClassDecoratorConfig {
  /**
   * @default 'auto'
   * 'auto' | null | undefined: Does not interfere with the presence or absence of class properties.
   * 'include': By default, the properties with decorators under the class must exist
   * 'exclude': By default, the properties with decorators under the class must not exist
   * 'partial': By default, the properties with decorators under the class sometimes it exists, sometimes it doesn't
   */
  partial?: 'auto' | 'include' | 'exclude' | 'partial' | undefined | null

  /**
   * @default true
   * false: By default, the properties with decorators under the class reuse the first generated random value in the same js runtime
   * true: By default, the properties with decorators under the class generate new random values every time in the same js runtime
   */
  alwaysRandom?: boolean
}
```

## @DefaultPartial

Set the `partial` of class metadata (configuration) to `partial`.

That is, the properties with decorators under the class sometimes it exists, sometimes it doesn't：

```ts
import {DefaultPartial, Random, IsInclude} from 'class-mock'

@DefaultPartial()
class Student {
  /**
   * By default, this property sometimes exists, sometimes it does not exist
   */
  @Random.words(5)
  name?: string

  /**
   * Force this property to exist
   */
  @IsInclude()
  @Random.number()
  age!: number

  /**
   * property without decorators do not participate in data generation
   */
  like?: string[]
}
```

## @DefaultInclude

Set the `partial` of class metadata (configuration) to `include`.

That is, by default, the properties with decorators under the class must exist:

```ts
import {DefaultInclude, Random, IsPartial} from 'class-mock'

@DefaultInclude()
class Student {
  /**
   * This property exists by default
   */
  @Random.words(5)
  name?: string

  /**
   * Force this property sometimes exists, sometimes not
   */
  @IsPartial()
  @Random.number()
  age!: number

  /**
   * property without decorators do not participate in data generation
   */
  like?: string[]
}
```

## @DefaultExclude

设置类元数据（配置数据）的 `partial` 属性为 `exclude`。

即设置默认该 class 下拥有装饰器的属性必定不会存在：

```ts
import {DefaultExclude, Random, IsInclude} from 'class-mock'

/**
 * 默认该 class 下拥有装饰器的属性必定不会存在
 */
@DefaultExclude()
class Student {
  /**
   * 本属性默认不存在
   */
  @Random.words(5)
  name?: string

  /**
   * 强制本属性存在
   */
  @IsInclude()
  @Random.number()
  age!: number

  /**
   * 没有装饰器的属性不参与数据生成
   */
  like?: string[]
}
```

## @DefaultAlwaysRandom

设置类元数据（配置数据）的 `alwaysRandom` 属性为 `true`。

即设置默认该 class 下拥有装饰器的属性在同一个 js runtime 里每次都生成新的随机值：

```ts
import {DefaultAlwaysRandom, Random, IsNotAlwaysRandom} from 'class-mock'

/**
 * 默认该 class 下拥有装饰器的属性在同一个 js runtime 里每次都生成新的随机值
 */
@DefaultAlwaysRandom()
class Student {
  /**
   * 本属性默认在同一个 js runtime 里每次都生成新的随机值
   */
  @Random.words(5)
  name?: string

  /**
   * 强制本属性在同一个 js runtime 里每次都复用第一次生成的随机值
   */
  @IsNotAlwaysRandom()
  @Random.number()
  age!: number

  /**
   * 没有装饰器的属性不参与数据生成
   */
  like?: string[]
}
```

## @DefaultNotAlwaysRandom

设置类元数据（配置数据）的 `alwaysRandom` 属性为 `false`。

即设置默认该 class 下拥有装饰器的属性在同一个 js runtime 里复用第一次生成的随机值：

```ts
import {DefaultNotAlwaysRandom, Random, IsAlwaysRandom} from 'class-mock'

/**
 * 默认该 class 下拥有装饰器的属性在同一个 js runtime 里复用第一次生成的随机值
 */
@DefaultNotAlwaysRandom()
class Student {
  /**
   * 本属性默认在同一个 js runtime 里每次都复用第一次生成的随机值
   */
  @Random.words(5)
  name?: string

  /**
   * 强制本属性在同一个 js runtime 里每次都生成新的随机值
   */
  @IsAlwaysRandom()
  @Random.number()
  age!: number

  /**
   * 没有装饰器的属性不参与数据生成
   */
  like?: string[]
}
```

## 示例

::: demo Class Mock Demo

```vue app.vue
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {
  DefaultPartial,
  DefaultNotAlwaysRandom,
  IsAlwaysRandom,
  IsInclude,
  Phone,
  Fake,
  IsExclude,
  createMock
} from 'class-mock'

@DefaultPartial()
@DefaultNotAlwaysRandom()
class Student {
  @IsInclude()
  @Phone.phoneNumber('188########')
  tel!: number

  @IsAlwaysRandom()
  @Fake('Hi, my name is {{name.firstName}} {{name.lastName}}!')
  introduction!: string

  @IsExclude() // 排除字段，不写也可以
  privateKey!: string

  // 没有数据装饰器，不参与生成
  like?: string[]
}

const mockStudentStr = ref('')

onMounted(() => {
  const mockStudent = createMock(Student, {
    array: true,
    length: 10
  })

  mockStudentStr.value = JSON.stringify(mockStudent, null, 4)
})
</script>
<template>
  <div>
    <div>Mock result:</div>
    <pre>{{ mockStudentStr }}</pre>
  </div>
</template>
<style>
pre {
  white-space: pre-wrap;
}
</style>
```

:::
