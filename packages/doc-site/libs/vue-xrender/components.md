# Components

[[toc]]

## XJsx

### Introduction

Component for rendering `jsx` in `template`.

The `jsx` function will receive a `props`, the `children` property of `props` points to the default slot of `<XJsx></XJsx>`.

### Props

| prop | description               | type                                                                                              | required | default |
| ---- | ------------------------- | ------------------------------------------------------------------------------------------------- | -------- | ------- |
| jsx  | jsx to render dynamically | `FunctionComponent` \|<br/><br/> `VNode` \|<br/><br/>`(props: Object, h: CreateElement) => VNode` | true     | -       |

### Usage

#### Use with composition-api

:::: code-group
::: code-group-item setup function

```vue
<template>
  <x-jsx :jsx="CardJsx"> The children node of CardJsx </x-jsx>
</template>

<script lang="tsx">
import {defineComponent, ref} from 'vue'
import {JsxFn, XJsx} from 'vue-xrender'

export default defineComponent({
  components: {
    XJsx
  },
  setup() {
    const time = ref(0)

    setInterval(() => {
      time.value++
    }, 1000)

    const CardJsx: JsxFn = props => (
      <div>
        <h1>CardJsx component, created in setup jsx function, used in template</h1>
        <h2>CardJsx real time: {time.value}s</h2>
        {props.children}
      </div>
    )

    return {
      CardJsx
    }
  }
})
</script>
```

:::
::: code-group-item setup sugar

```vue
<script lang="tsx" setup>
import {ref} from 'vue'
import {JsxFn, XJsx} from 'vue-xrender'

const time = ref(0)

setInterval(() => {
  time.value++
}, 1000)

const CardJsx: JsxFn = props => (
  <div>
    <h1>CardJsx component, created in setup jsx function, used in template</h1>
    <h2>CardJsx real time: {time.value}s</h2>
    {props.children}
  </div>
)
</script>
<template>
  <x-jsx :jsx="CardJsx"> The children node of CardJsx </x-jsx>
</template>
```

:::
::::

#### Use with options-api

```vue
<template>
  <x-jsx :jsx="CardJsx"> The children node of CardJsx </x-jsx>
</template>

<script lang="jsx">
import {XJsx} from 'vue-xrender'

export default {
  components: {
    XJsx
  },
  data() {
    return {
      time: 0
    }
  },
  computed: {
    CardJsx() {
      return props => (
        <div>
          <h1>CardJsx component, created in computed, used in template</h1>
          <h2>CardJsx real time: {this.time}s</h2>
          {props.children}
        </div>
      )
    }
  },
  mounted() {
    setInterval(() => {
      this.time++
    }, 1000)
  }
}
</script>
```

### Example

::: demo XJsx Demo

```vue App.vue
<template>
  <x-jsx :jsx="CardJsx"> The children node of CardJsx </x-jsx>
</template>

<script lang="tsx">
import {defineComponent, ref} from 'vue'
import {JsxFn, XJsx} from 'vue-xrender'

export default defineComponent({
  components: {
    XJsx
  },
  setup() {
    const time = ref(0)

    setInterval(() => {
      time.value++
    }, 1000)

    const CardJsx: JsxFn = props => (
      <div>
        <h1>CardJsx component, created in setup jsx function, used in template</h1>
        <h2>CardJsx real time: {time.value}s</h2>
        {props.children}
      </div>
    )

    return {
      CardJsx
    }
  }
})
</script>
```

:::

### Notice

The project needs to configure the Jsx compiler, otherwise the Jsx syntax cannot be compiled

- [Vue3 babel jsx plugin](https://github.com/vuejs/babel-plugin-jsx#installation)
- [Vue2 babel jsx plugin](https://github.com/vuejs/jsx-vue2)
- [Vue3 vite jsx plugin](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)

Let's demonstrate the vite jsx configuration

:::: code-group
::: code-group-item vue3

```ts
import path from 'path'
import {defineConfig} from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [Vue(), vueJsx()]
})
```

:::
::: code-group-item vue2

```ts
import path from 'path'
import {defineConfig} from 'vite'
import {createVuePlugin} from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [
    createVuePlugin({
      jsx: true,
      jsxOptions: {
        compositionAPI: true
      }
    })
  ]
})
```

:::
::::

If you are using [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint) remember to configure `jsx` to `true`, otherwise an error will be reported, do this in `.eslintrc.js`

```js
// .eslintrc.js
module.exports = {
  // ....
  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true // Enable jsx parsing
    }
  }
  // ....
}
```

## XTpl

### Introduction

Component for rendering dynamic `template` strings.

The `template` string can be changed at any time at runtime.

This component does not support pass-through slots.

### Props

| prop | description                                | type   | required | default              |
| ---- | ------------------------------------------ | ------ | -------- | -------------------- |
| tpl  | template string to be dynamically compiled | string | true     | -                    |
| ctx  | the context of the template string         | Object | false    | XTpl.$parent \|\| {} |

### Usage

#### Use with composition-api

:::: code-group
::: code-group-item setup function

```vue
<template>
  <x-tpl :tpl="CardTpl" />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {XTpl} from 'vue-xrender'

export default defineComponent({
  components: {
    XTpl
  },
  setup() {
    const time = ref(0)

    setInterval(() => {
      time.value++
    }, 1000)

    const CardTpl = `
      <div>
        <h1>CardTpl dynamic template string, used in template</h1>
        <h2>CardTpl real time: {{time}}s</h2>
      </div>
    `

    return {
      time, // Be careful to expose the time here, otherwise the time rendering will not be found on the vm instance
      CardTpl
    }
  }
})
</script>
```

:::
::: code-group-item setup sugar

```vue
<script lang="ts" setup>
import {ref} from 'vue'
import {XTpl} from 'vue-xrender'

const time = ref(0)

setInterval(() => {
  time.value++
}, 1000)

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
  <x-tpl :tpl="CardTpl" />
</template>
```

:::
::::

#### Use with options-api

```vue
<template>
  <x-tpl :tpl="CardTpl" />
</template>

<script>
import {XTpl} from 'vue-xrender'

export default {
  components: {
    XTpl
  },
  data() {
    return {
      time: 0,
      CardTpl: `
        <div>
          <h1>CardTpl dynamic template string, used in template</h1>
          <h2>CardTpl real time: {{time}}s</h2>
        </div>
      `
    }
  },
  mounted() {
    setInterval(() => {
      this.time++
    }, 1000)
  }
}
</script>
```

### Example

::: demo XTpl Demo

```vue App.vue
<template>
  <x-tpl :tpl="CardTpl" />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {XTpl} from 'vue-xrender'

export default defineComponent({
  components: {
    XTpl
  },
  setup() {
    const time = ref(0)

    setInterval(() => {
      time.value++
    }, 1000)

    const CardTpl = `
      <div>
        <h1>CardTpl dynamic template string, used in template</h1>
        <h2>CardTpl real time: {{time}}s</h2>
      </div>
    `

    return {
      time, // Be careful to expose the time here, otherwise the time rendering will not be found on the vm instance
      CardTpl
    }
  }
})
</script>
```

:::

### Notice

**This component depends on the vue runtime compiler**, please point the alias (alias) to the **vue full version**in the packager configuration

#### Vue3 configure the full version of vue

:::: code-group
::: code-group-item vite.config.js

```js
const {defineConfig} = require('vite')
const path = require('path')

export default defineConfig({
  resolve: {
    alias: {
      vue: path.resolve(__dirname, './node_modules/vue/dist/vue.esm-browser.js')
    }
  }
})
```

:::
::: code-group-item vue.config.js

```js
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue: path.resolve(__dirname, './node_modules/vue/dist/vue.esm-browser.js')
      }
    }
  }
}
```

:::
::: code-group-item webpack.config.js

```js
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      vue: path.resolve(__dirname, './node_modules/vue/dist/vue.esm-browser.js')
    }
  }
}
```

:::
::::

#### Vue2 configure the full version of vue

:::: code-group
::: code-group-item vite.config.js

```js
const {defineConfig} = require('vite')
const path = require('path')

export default defineConfig({
  resolve: {
    alias: {
      vue: path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js')
    }
  }
})
```

:::
::: code-group-item vue.config.js

```js
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue: path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js')
      }
    }
  }
}
```

:::
::: code-group-item webpack.config.js

```js
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      vue: path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js')
    }
  }
}
```

:::
::::
