# 介绍

一个可以让你在 `template` 里渲染 `jsx` 或 `tsx` 组件的库，让你的 `ui` 渲染更灵活。

支持 `vue2` 和 `vue3`。

## 安装

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

## 浏览器(CDN)

```html:no-v-pre
<!-- Unpkg -->
<script src="https://unpkg.com/vue-xrender@{{version}}" />

<!-- JsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/vue-xrender@{{version}}" />
```

## 示例

::: demo Vue Xrender Demo

```vue App.vue
<script lang="tsx" setup>
import {JsxFn, useJsx, XJsx, XTpl} from 'vue-xrender'
import {ref} from 'vue'

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

const CardJsx: JsxFn = props => (
  <div>
    <h1>CardJsx 组件，在 setup jsx 函数中创建，在模板中使用</h1>
    <h2>CardJsx 实时时间: {time.value}s</h2>
    {props.children}
  </div>
)

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
  <div class="current-page">
    <div>time：{{ time }}s</div>
    <br />
    <br />
    <card>
      <div>来自 template 的 Card 组件的 children</div>
    </card>

    <x-jsx :jsx="CardJsx"> CardJsx 的 children 节点 </x-jsx>
    <x-tpl :tpl="CardTpl" />
  </div>
</template>
```

:::
