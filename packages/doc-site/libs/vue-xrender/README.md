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

## Why

Think about it, if you want to make a component like this：

```vue
<template>
  <Modal v-if="isWrapModal">
    <article>
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </article>
  </Modal>
  <article v-else>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </article>
</template>
<script>
import {defineComponent} from 'vue'
import Modal from 'xxx-ui'

export default defineComponent({
  components: {
    Modal
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    isWrapModal: {
      type: Boolean,
      default: false
    }
  }
})
</script>
```

Now that you have `vue-xrender`, you can：

```vue
<template>
  <Modal v-if="isWrapModal">
    <Article />
  </Modal>
  <Article v-else />
</template>
<script lang="jsx">
import {defineComponent} from 'vue'
import Modal from 'xxx-ui'
import {useJsx} from 'vue-xrender'

export default defineComponent({
  components: {
    Modal
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    isWrapModal: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    useJsx('Article', () => (
      <article>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
      </article>
    ))

    return {}
  }
})
</script>
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
