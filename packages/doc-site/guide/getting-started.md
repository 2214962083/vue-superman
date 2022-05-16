# Guide Getting Started

::: demo

```vue hello-world.vue
<template>
  <div>Hello World</div>
</template>
<script lang="ts">
export default {
  name: 'HelloWorld'
}
</script>
```

:::

::: demo

```vue app.vue
<template>
  <div>App</div>
</template>
<script lang="ts">
import {Random, IsArray, Address, Phone, Entity, Fake, IsExclude} from 'class-mock'

class Skill {
  @Random.words(5)
  name!: string
}

class Student extends User {
  @IsArray(2)
  @Address.streetAddress()
  address!: string[]

  @Phone.phoneNumber('188########')
  tel!: number

  // @IsPartial()
  @Entity(() => Skill)
  skills!: Skill[]

  @Fake('Hi, my name is {{name.firstName}} {{name.lastName}}!')
  introduction!: string

  @IsExclude()
  privateKey!: string
}

export default {
  name: 'App',
  mounted() {
    const mockStudent = createMock(Student)
    console.log('mockStudent: ', mockStudent)
  }
}
</script>
```

```js user.js
class User {
  age = 0
  name = ''
}
```

:::
