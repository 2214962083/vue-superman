# Hooks

## useJsx

### 介绍

一个可以自动注册 `jsx` 为 `component` 的 `hooks`。

可以像 `react` 一样组合 `jsx component` 使用。

`jsx` function 会接收一个 `props`，`props` 的属性 `children` 指向 `jsx component` 的默认插槽。

可以和 `template` 混写。

### 参数

```ts
/**
 * @param jsxFn jsx 函数，函数接收一个 props，props.children 是默认插槽
 * @return vue component 构造器
 */
function useJsx(jsxFn: Function | Jsx.Element): Component

/**
 * @param name 在当前页面以该 name 注册 jsx 为一个新组件
 * @param jsxFn jsx 函数，函数接收一个 props，props.children 是默认插槽
 * @return vue component 构造器
 */
function useJsx(name: string, jsxFn: Function | Jsx.Element): Component
```

### 用法

:::: code-group
::: code-group-item setup function

```vue
<template>
  <card>
    <div>来自 template 的 Card 组件的 children</div>
  </card>
</template>

<script lang="tsx">
import {defineComponent, ref} from 'vue'
import {useJsx} from 'vue-xrender'

export default defineComponent({
  setup() {
    const time = ref(0)

    setInterval(() => {
      time.value++
    }, 1000)

    // 静态 jsx
    const SubTitle = useJsx(<h3>子标题: 第一帧 time 值: {time.value}s</h3>)

    // 动态 jsx
    const Title = useJsx(props => (
      <div>
        <h1>标题：动态 time 值: {time.value}s</h1>
        {props.children}
      </div>
    ))

    // 当 useJsx 第一个参数为字符串时，默认为 component name 注册该 jsx 为 component
    useJsx('Card', props => (
      <div>
        <h1>Card 组件，在 setup 中用 useJsx 创建，在模板中使用</h1>
        <Title>
          <SubTitle></SubTitle>
        </Title>
        {props.children}
      </div>
    ))

    return {}
  }
})
</script>
```

:::
::: code-group-item setup sugar

```vue
<script lang="tsx" setup>
import {ref} from 'vue'
import {useJsx} from 'vue-xrender'

const time = ref(0)

setInterval(() => {
  time.value++
}, 1000)

// 静态 jsx
const SubTitle = useJsx(<h3>子标题: 第一帧 time 值: {time.value}s</h3>)

// 动态 jsx
const Title = useJsx(props => (
  <div>
    <h1>标题：动态 time 值: {time.value}s</h1>
    {props.children}
  </div>
))

// 当 useJsx 第一个参数为字符串时，默认为 component name 注册该 jsx 为 component
useJsx('Card', props => (
  <div>
    <h1>Card 组件，在 setup 中用 useJsx 创建，在模板中使用</h1>
    <Title>
      <SubTitle></SubTitle>
    </Title>
    {props.children}
  </div>
))
</script>
<template>
  <card>
    <div>来自 template 的 Card 组件的 children</div>
  </card>
</template>
```

:::
::::

### 示例

::: demo useJsx Demo

```vue App.vue
<template>
  <card>
    <div>来自 template 的 Card 组件的 children</div>
  </card>
</template>

<script lang="tsx">
import {defineComponent, ref} from 'vue'
import {useJsx} from 'vue-xrender'

export default defineComponent({
  setup() {
    const time = ref(0)

    setInterval(() => {
      time.value++
    }, 1000)

    // 静态 jsx
    const SubTitle = useJsx(<h3>子标题: 第一帧 time 值: {time.value}s</h3>)

    // 动态 jsx
    const Title = useJsx(props => (
      <div>
        <h1>标题：动态 time 值: {time.value}s</h1>
        {props.children}
      </div>
    ))

    // 当 useJsx 第一个参数为字符串时，默认为 component name 注册该 jsx 为 component
    useJsx('Card', props => (
      <div>
        <h1>Card 组件，在 setup 中用 useJsx 创建，在模板中使用</h1>
        <Title>
          <SubTitle></SubTitle>
        </Title>
        {props.children}
      </div>
    ))

    return {}
  }
})
</script>
```

:::

### 注意

[请查看 jsx 注意事项](components.md#注意)
