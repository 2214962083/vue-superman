# Introduction

A library that lets you render `jsx` or `tsx` components in a `template`, making your `ui` rendering more flexible.

`vue2` and `vue3` are supported.

## Installation

:::: code-group
::: code-group-item npm

```bash
npm i vue-xrender
```

:::
::: code-group-item yarn

```bash
yarn add vue-xrender
```

:::
::: code-group-item pnpm

```bash
pnpm add vue-xrender
```

:::
::::

## Use in browser (CDN)

```html:no-v-pre
<!-- Unpkg -->
<script src="https://unpkg.com/vue-xrender@{{version}}" />

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/vue-xrender@{{version}}" />
```

## Example

::: demo Vue Xrender Demo

```vue App.vue
<script lang="tsx" setup>
import {JsxFn, useJsx, XJsx, XTpl} from 'vue-xrender'
import {ref} from 'vue'

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

const CardJsx: JsxFn = props => (
  <div>
    <h1>CardJsx component, created in setup jsx function, used in template</h1>
    <h2>CardJsx real time: {time.value}s</h2>
    {props.children}
  </div>
)

const CardTpl = `
  <div>
    <h1>CardTpl dynamic template string, used in template</h1>
    <h2>CardTpl real time: {{time}}s</h2>
  </div>
`

defineExpose({
  time // Be careful to expose the time here, otherwise the time rendering will not be found on the vm instance
})
</script>

<template>
  <div class="current-page">
    <div>time：{{ time }}s</div>
    <br />
    <br />
    <card>
      <div>The children of the Card component from template</div>
    </card>

    <x-jsx :jsx="CardJsx"> The children node of CardJsx </x-jsx>
    <x-tpl :tpl="CardTpl" />
  </div>
</template>
```

:::
