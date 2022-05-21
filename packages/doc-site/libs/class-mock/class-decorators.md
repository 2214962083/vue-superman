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

Set the `partial` of class metadata (configuration) to `exclude`.

By default, the properties with decorators under the class must not exist:

```ts
import {DefaultExclude, Random, IsInclude} from 'class-mock'

@DefaultExclude()
class Student {
  /**
   * This property does not exist by default
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

## @DefaultAlwaysRandom

Set the `alwaysRandom` of class metadata (configuration) to `true`.

By default, the properties with decorators under the class generate new random values every time in the same js runtime：

```ts
import {DefaultAlwaysRandom, Random, IsNotAlwaysRandom} from 'class-mock'

@DefaultAlwaysRandom()
class Student {
  /**
   * This property generates a new random value every time in the same js runtime by default
   */
  @Random.words(5)
  name?: string

  /**
   * Force this property to reuse the first generated random value every time in the same js runtime
   */
  @IsNotAlwaysRandom()
  @Random.number()
  age!: number

  /**
   * property without decorators do not participate in data generation
   */
  like?: string[]
}
```

## @DefaultNotAlwaysRandom

Set the `alwaysRandom` of class metadata (configuration) to `true`.

By default, the properties with decorators under the class reuse the first generated random value in the same js runtime：

```ts
import {DefaultNotAlwaysRandom, Random, IsAlwaysRandom} from 'class-mock'

@DefaultNotAlwaysRandom()
class Student {
  /**
   * By default, this property reuses the random value generated for the first time every time in the same js runtime.
   */
  @Random.words(5)
  name?: string

  /**
   * Force this property to generate a new random value every time in the same js runtime
   */
  @IsAlwaysRandom()
  @Random.number()
  age!: number

  /**
   * property without decorators do not participate in data generation
   */
  like?: string[]
}
```

## Example

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

  @IsExclude() // Exclude fields, you can also not write them
  privateKey!: string

  /**
   * property without decorators do not participate in data generation
   */
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
