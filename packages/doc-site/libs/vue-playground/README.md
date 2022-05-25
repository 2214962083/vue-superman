# Introduction

`vue-playground` is a `vue3` component based on [monaco-editor](https://github.com/microsoft/monaco-editor).

It supports real-time editing, real-time compilation, and real-time preview. Similar to the small [codesandbox](https://codesandbox.io/).

Features:

- Real-time editing, real-time compilation `(vue3, js, ts, jsx, tsx, css)`, real-time running, real-time preview.
- Support for custom `import` mapping.
- Support to create new files, delete files, support.
- Editor supports `ts` type hinting (`.ts` files only).
- Support switching layout, support full screen.
- Support dark mode.
- Support custom theme color.

## Installation

:::: code-group
::: code-group-item npm

```bash
npm i vue-playground monaco-editor
```

:::
::: code-group-item yarn

```bash
yarn add vue-playground monaco-editor
```

:::
::: code-group-item pnpm

```bash
pnpm add vue-playground monaco-editor
```

:::
::::

## Notice

This component depends on [monaco-editor](https://github.com/microsoft/monaco-editor) and [@babel/standalone](https://babeljs.io/docs/en/babel-standalone), So it will be bigger after packing.

Recommended for lowcode projects. Or documentation to write demo .
