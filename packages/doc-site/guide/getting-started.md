# Guide Getting Started

::: demo Vue Xrender Demo

```vue hello-world.vue
<template>
  <div>
    Hello World
    <div class="current-page">
      <div>time：{{ time }}s</div>
      <br />
      <br />
      <card>
        <div>Card component's children from template</div>
      </card>
    </div>
  </div>
</template>
<script lang="ts">
import {useJsx} from 'vue-xrender'
import {ref} from 'vue'

export default {
  name: 'HelloWorld',
  setup() {
    const time = ref(0)
    setInterval(() => {
      time.value++
    }, 1000)

    // static jsx element
    const SubTitle = useJsx(<h3>subTitle：time first frame value: {time.value}s</h3>)

    // dynamic jsx element
    const Title = useJsx(props => (
      <div>
        <h1>title：time realtime value: {time.value}s</h1>
        {props.children}
      </div>
    ))

    // you can use the name in template when you add name in first argument
    // warning: component name 'Card' is already defined, don't use it as a variable name at setup sugar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const Card2 = useJsx('Card', props => (
      <div>
        <h1>Card component, create in setup useJsx, use in template</h1>
        <Title>
          <SubTitle></SubTitle>
        </Title>
        {props.children}
      </div>
    ))
    return {time}
  }
}
</script>
```

:::

::: demo Class Mock Demo

```vue app.vue
<template>
  <div>
    <div>Mock result:</div>
    <pre>{{ mockStudent }}</pre>
  </div>
</template>
<script lang="ts">
import {Student} from './user.ts'
import {createMock} from 'class-mock'

export default {
  name: 'App',
  data() {
    return {
      mockStudent: ''
    }
  },
  mounted() {
    const mockStudent = createMock(Student)
    console.log('mockStudent: ', mockStudent)
    this.mockStudent = JSON.stringify(mockStudent, null, 4)
  }
}
</script>
<style>
pre {
  white-space: pre-wrap;
}
</style>
```

```ts user.ts
import {Random, IsArray, Address, Phone, Entity, Fake, IsExclude, createMock} from 'class-mock'

class Skill {
  @Random.words(5)
  name!: string
}

export class Student {
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
```

:::
