# 组件

## XJsx

### 介绍

用于在 `template` 渲染 `jsx` 的组件。

`jsx` function 会接收一个 `props`，`props` 的属性 `children` 指向 `<XJsx></XJsx>` 的默认插槽。

### props

| 参数 | 说明             | 类型                                                                                              | 是否必填 | 默认值 |
| ---- | ---------------- | ------------------------------------------------------------------------------------------------- | -------- | ------ |
| jsx  | 要动态渲染的 jsx | `FunctionComponent` \|<br/><br/> `VNode` \|<br/><br/>`(props: Object, h: CreateElement) => VNode` | 是       | -      |

### 用法

#### composition-api 使用

:::: code-group
::: code-group-item setup function

```vue
<template>
  <x-jsx :jsx="CardJsx"> CardJsx 的 children 节点 </x-jsx>
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
        <h1>CardJsx 组件，在 setup jsx 函数中创建，在模板中使用</h1>
        <h2>CardJsx 实时时间: {time.value}s</h2>
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
    <h1>CardJsx 组件，在 setup jsx 函数中创建，在模板中使用</h1>
    <h2>CardJsx 实时时间: {time.value}s</h2>
    {props.children}
  </div>
)
</script>
<template>
  <x-jsx :jsx="CardJsx"> CardJsx 的 children 节点 </x-jsx>
</template>
```

:::
::::

#### options-api 使用

```vue
<template>
  <x-jsx :jsx="CardJsx"> CardJsx 的 children 节点 </x-jsx>
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
          <h1>CardJsx 组件，在 computed 中创建，在模板中使用</h1>
          <h2>CardJsx 实时时间: {this.time}s</h2>
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

### 示例

::: demo XJsx Demo

```vue App.vue
<template>
  <x-jsx :jsx="CardJsx"> CardJsx 的 children 节点 </x-jsx>
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
        <h1>CardJsx 组件，在 setup jsx 函数中创建，在模板中使用</h1>
        <h2>CardJsx 实时时间: {time.value}s</h2>
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

### 注意

项目要配置 Jsx 编译器，否则无法编译 Jsx 语法

- [vue3 babel jsx 插件](https://github.com/vuejs/babel-plugin-jsx#installation)
- [vue2 babel jsx 插件](https://github.com/vuejs/jsx-vue2)
- [vue3 vite jsx 插件](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)

下面演示一下 vite jsx 配置

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

如果你正在用 [`@typescript-eslint/parser`](https://github.com/typescript-eslint/typescript-eslint) 记得配置一下 `jsx` 为 `true`，否则会报错，比如

```js
// .eslintrc.js
module.exports = {
  // ....
  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true // 启用 jsx 语法解析
    }
  }
  // ....
}
```

## XTpl

### 介绍

用于渲染动态 `template` 字符串的组件。

`template` 字符串可在运行时随时拼接变更。

本组件不支持传递插槽。

### props

| 参数 | 说明                         | 类型   | 是否必填 | 默认值               |
| ---- | ---------------------------- | ------ | -------- | -------------------- |
| tpl  | 要动态编译的 template 字符串 | string | 是       | -                    |
| ctx  | template 字符串的上下文      | Object | 否       | XTpl.$parent \|\| {} |

### 用法

#### composition-api 使用

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
        <h1>CardTpl 动态模板字符串，在模板中使用</h1>
        <h2>CardTpl 实时时间: {{time}}s</h2>
      </div>
    `

    return {
      time, // 注意要在此处暴露 time，否则 vm 实例上会找不到 time 渲染
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
    <h1>CardTpl 动态模板字符串，在模板中使用</h1>
    <h2>CardTpl 实时时间: {{time}}s</h2>
  </div>
`

defineExpose({
  time // 注意要在此处暴露 time，否则 vm 实例上会找不到 time 渲染
})
</script>
<template>
  <x-tpl :tpl="CardTpl" />
</template>
```

:::
::::

#### options-api 使用

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
          <h1>CardTpl 动态模板字符串，在模板中使用</h1>
          <h2>CardTpl 实时时间: {{time}}s</h2>
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

### 示例

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
        <h1>CardTpl 动态模板字符串，在模板中使用</h1>
        <h2>CardTpl 实时时间: {{time}}s</h2>
      </div>
    `

    return {
      time, // 注意要在此处暴露 time，否则 vm 实例上会找不到 time 渲染
      CardTpl
    }
  }
})
</script>
```

:::

### 注意

**该组件依赖于 vue 运行时 compiler**，请在打包器配置将别名（alias）指向 **vue 完整版**

#### vue3 配置完整版 vue

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

#### vue2 配置完整版 vue

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
