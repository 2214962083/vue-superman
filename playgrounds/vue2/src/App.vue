<script lang="tsx" setup>
import {useJsx} from 'vue-xrender'
import {ref} from '@vue/composition-api'

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
    <h1>Card component, create in setup jsx, use in template</h1>
    <Title>
      <SubTitle></SubTitle>
    </Title>
    {props.children}
  </div>
))
</script>

<template>
  <div class="current-page">
    <div>time：{{ time }}s</div>
    <br />
    <br />
    <card>
      <div>Card component's children from template</div>
    </card>
  </div>
</template>
