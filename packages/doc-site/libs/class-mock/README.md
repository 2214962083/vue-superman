# Introduction

A mock library that lets you use decorators with classes to generate fake data. Based on [@faker-js/faker](https://github.com/faker-js/faker)。

`class-mock` decorators essentially just stores metadata (configuration data) and does not modify the class.

Finally, when `createMock(MockClass)` is executed, all metadata (configuration data) of `MockClass` will be taken out, and then data generation will be performed with `@faker-js/faker`.

Supports any `ts` project or [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) (`legacy` is `true`) `js` project.

## Installation

:::: code-group
::: code-group-item npm

```bash
npm i class-mock @faker-js/faker
```

:::
::: code-group-item yarn

```bash
yarn add class-mock @faker-js/faker
```

:::
::: code-group-item pnpm

```bash
pnpm add class-mock @faker-js/faker
```

:::
::::

## Notice

`ts` project needs to be configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Example

::: demo Class Mock Demo

```vue app.vue
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {Random, IsArray, Address, Phone, Entity, Fake, IsExclude, createMock} from 'class-mock'

class Skill {
  @Random.words(5)
  name!: string
}

class Student {
  @IsArray(2) // Assert that this field is an array with a length of 2
  @Address.streetAddress()
  address!: string[]

  @Phone.phoneNumber('188########')
  tel!: number

  @IsArray({max: 5, min: 1})
  @Entity(() => Skill)
  skills!: Skill[]

  @Fake('Hi, my name is {{name.firstName}} {{name.lastName}}!')
  introduction!: string

  @IsExclude() // Exclude this field
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
