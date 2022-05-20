# 类装饰器

[[toc]]

## 类的元数据（配置数据）

了解装饰器前，我们先了解一下类的元数据（配置数据）。

其实 `class-mock` 装饰器本质只是存储元数据（配置数据），并不会对类进行修改。

类的元数据（配置数据）结构如下:

```ts
interface ClassDecoratorConfig {
  /**
   * include: 默认该 class 下拥有装饰器的属性必定会存在（默认）
   * exclude: 默认该 class 下拥有装饰器的属性必定不会存在
   * partial: 默认该 class 下拥有装饰器的属性有时会存在，有时不会存在
   */
  partial?: 'include' | 'exclude' | 'partial'

  /**
   * false: 默认该 class 下拥有装饰器的属性在同一个 js runtime 里复用第一次生成的随机值
   * true: 默认该 class 下拥有装饰器的属性在同一个 js runtime 里每次都生成新的随机值（默认）
   */
  alwaysRandom?: boolean
}
```

## @DefaultPartial

设置类元数据（配置数据）的 `partial` 属性为 `partial`。

即设置默认该 class 下拥有装饰器的属性有时会存在，有时不会存在：

```ts
import {DefaultPartial, Random, IsInclude} from 'class-mock'

/**
 * 默认该 class 下拥有装饰器的属性有时会存在，有时不会存在
 */
@DefaultPartial()
class Student {
  /**
   * 本属性默认有时候会存在，有时候不会存在
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

## @DefaultInclude

设置类元数据（配置数据）的 `partial` 属性为 `include`。

即设置默认该 class 下拥有装饰器的属性必定会存在：

```ts
import {DefaultInclude, Random, IsPartial} from 'class-mock'

/**
 * 默认该 class 下拥有装饰器的属性必定会存在
 */
@DefaultInclude()
class Student {
  /**
   * 本属性默认存在
   */
  @Random.words(5)
  name?: string

  /**
   * 强制本属性有时候会存在，有时候不会存在
   */
  @IsPartial()
  @Random.number()
  age!: number

  /**
   * 没有装饰器的属性不参与数据生成
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

  @IsExclude() // 排除字段
  privateKey!: string
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
