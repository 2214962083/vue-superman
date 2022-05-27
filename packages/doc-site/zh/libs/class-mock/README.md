# 介绍

一个可以让你用装饰器配合 class 生成假数据的 mock 库。基于 [@faker-js/faker](https://github.com/faker-js/faker)。

`class-mock` 装饰器本质只是存储元数据（配置数据），并不会对类进行修改。

最后在 `createMock(MockClass)` 执行时，会取出 `MockClass` 的所有元数据（配置数据），然后配合 `@faker-js/faker` 进行数据生成。

支持任何 `ts` 项目或装了 [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) (`legacy` 为 `true`) 的 `js` 项目。

## 安装

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

## 注意

`ts` 项目需要在 `tsconfig.json` 配置

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 示例

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
  @IsArray(2) // 断言本字段为数组，长度为 2
  @Address.streetAddress()
  address!: string[]

  @Phone.phoneNumber('188########')
  tel!: number

  @IsArray({max: 5, min: 1})
  @Entity(() => Skill)
  skills!: Skill[]

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
