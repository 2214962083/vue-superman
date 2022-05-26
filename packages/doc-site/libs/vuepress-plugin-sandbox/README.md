# Introduction

`vuepress-plugin-sandbox` is a `vuepress v2` plugin based on [vue-playground](../vue-playground/).

It is a demo plugin that supports real-time editing, real-time compilation, and real-time preview. Similar to the small [codesandbox](https://codesandbox.io/).

Features:

- Real-time editing, real-time compilation `(vue3, js, ts, jsx, tsx, css)`, real-time running, real-time preview
- Support for custom `import` mapping
- Support to create new files, delete files, support
- Editor supports `ts` type hinting (`.ts` files only)
- Support switching layout, support full screen
- Support dark mode
- Support custom theme color

## Installation

:::: code-group
::: code-group-item npm

```bash
npm i vuepress-plugin-sandbox monaco-editor
```

:::
::: code-group-item yarn

```bash
yarn add vuepress-plugin-sandbox monaco-editor
```

:::
::: code-group-item pnpm

```bash
pnpm add vuepress-plugin-sandbox monaco-editor
```

:::
::::

## Notice

Because `vuepress v2` is still in beta stage, the plugin is not stable yet, but will try to keep up with the latest `vuepress v2` version.

Currently `vuepress@2.0.0-beta.40` and above are supported.

Because `vuepress-plugin-sandbox` is based on [vue-playground](../vue-playground/), which in turn depends on [monaco-editor](https://github.com/microsoft/monaco-editor) and [@babel/standalone](https://babeljs.io/docs/en/babel-standalone), so it will be larger after packaging.
