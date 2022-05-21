# Hooks

[[toc]]

## useJsx

### Introduction

A `hooks` that can automatically register `jsx` as a `component`.

Can be combined with jsx components just like `react`.

The `jsx` function will receive a `props` whose property `children` points to the default slot of the `jsx component`.

Can be mixed with `template`.

### Parameters

```ts
/**
 * @param jsxFn jsx function, the function receives a props, props.children is the default slot
 * @return vue component constructor
 */
function useJsx(jsxFn: Function | Jsx.Element): Component

/**
 * @param name Register jsx as a new component with this name on the current page
 * @param jsxFn jsx function, the function receives a props, props.children is the default slot
 * @return vue component constructor
 */
function useJsx(name: string, jsxFn: Function | Jsx.Element): Component
```

### Usage

:::: code-group
::: code-group-item setup function

```vue
<template>
  <card>
    <div>The children of the Card component from template</div>
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

    // Static jsx
    const SubTitle = useJsx(<h3>Subtitle: The time of first frame is: {time.value}s</h3>)

    // Dynamic jsx
    const Title = useJsx(props => (
      <div>
        <h1>Title: Dynamic time values: {time.value}s</h1>
        {props.children}
      </div>
    ))

    // When the first parameter of useJsx is a string, the default is the component name to register the jsx as a component
    useJsx('Card', props => (
      <div>
        <h1>Card component, created with useJsx in setup, used in template</h1>
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

// Static jsx
const SubTitle = useJsx(<h3>Subtitle: The time of first frame is: {time.value}s</h3>)

// Dynamic jsx
const Title = useJsx(props => (
  <div>
    <h1>Title: Dynamic time values: {time.value}s</h1>
    {props.children}
  </div>
))

// When the first parameter of useJsx is a string, the default is the component name to register the jsx as a component
useJsx('Card', props => (
  <div>
    <h1>Card component, created with useJsx in setup, used in template</h1>
    <Title>
      <SubTitle></SubTitle>
    </Title>
    {props.children}
  </div>
))
</script>
<template>
  <card>
    <div>The children of the Card component from template</div>
  </card>
</template>
```

:::
::::

### Example

::: demo useJsx Demo

```vue App.vue
<template>
  <card>
    <div>The children of the Card component from template</div>
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

    // Static jsx
    const SubTitle = useJsx(<h3>Subtitle: The time of first frame is: {time.value}s</h3>)

    // Dynamic jsx
    const Title = useJsx(props => (
      <div>
        <h1>Title: Dynamic time values: {time.value}s</h1>
        {props.children}
      </div>
    ))

    // When the first parameter of useJsx is a string, the default is the component name to register the jsx as a component
    useJsx('Card', props => (
      <div>
        <h1>Card component, created with useJsx in setup, used in template</h1>
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

### Notice

[Please see jsx notice](components.md#notice)
