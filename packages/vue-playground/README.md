<div align="center">
  <a href="https://vue-superman.vercel.app/">
    <img src="https://vue-superman.vercel.app/images/logo.svg" width="150">
  </a>
  <h1>vue-playground</h1>
  <p>A code editor runner, real-time editing, real-time compilation, real-time preview.</p>
  <p>
    <h3><span>English</span>&emsp;|&emsp;<a href="./README_zh-CN.md">简体中文</a></h3>
  </p>
  <p>
    <img src="https://img.shields.io/npm/v/vue-playground?style=flat-square" alt="version">
    <img src="https://img.shields.io/npm/dependency-version/vue-playground/peer/monaco-editor" alt="monaco-editor">
    <img src="https://img.shields.io/npm/dependency-version/vue-playground/peer/vue" alt="vue">
    <img src="https://img.shields.io/npm/l/vue-playground.svg" alt="license">
    <img src="https://img.shields.io/codecov/c/github/2214962083/vue-superman" alt="coverage">
    <img src="https://img.badgesize.io/https://unpkg.com/vue-playground?compression=gzip&label=gzip" alt="gzip" />
    <img src="https://img.shields.io/github/stars/2214962083/vue-superman?style=social" alt="stars">
  </p>
</div>

## Introduction

`vue-playground` is a `vue3` component based on [monaco-editor](https://github.com/microsoft/monaco-editor).

It supports real-time editing, real-time compilation, and real-time preview. Similar to the small [codesandbox](https://codesandbox.io/).

## Features

- Real-time editing, real-time compilation `(vue3, js, ts, jsx, tsx, css)`, real-time running, real-time preview.
- Support for custom `import` mapping.
- Support to create new files, delete files, support.
- Editor supports `ts` type hinting (`.ts` files only).
- Support switching layout, support full screen.
- Support dark mode.
- Support custom theme color.

## Installation

for npm

```bash
npm i vue-playground monaco-editor
```

for yarn

```bash
yarn add vue-playground monaco-editor
```

for pnpm

```bash
pnpm add vue-playground monaco-editor
```

## Usage

The usage is documented in the [documentation](https://vue-superman.vercel.app/libs/vue-playground/).

## Notice

This component depends on [monaco-editor](https://github.com/microsoft/monaco-editor) and [@babel/standalone](https://babeljs.io/docs/en/babel-standalone), So it will be bigger after packing.

Recommended for lowcode projects. Or documentation to write demo .

## Acknowledgement

- [vuejs/repl](https://github.com/vuejs/repl)
- [code-kitchen](https://github.com/freewheel/code-kitchen)
- [vueuse-playground-next](https://github.com/wheatjs/vueuse-playground-next)

## Contributing

Learn about contribution [here](https://github.com/2214962083/vue-superman/blob/master/CONTRIBUTING.md).

This project exists thanks to all the people who contribute:

<a href="https://github.com/2214962083/vue-superman/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=2214962083/vue-superman" />
</a>

## License

[MIT](https://github.com/2214962083/vue-superman/blob/master/LICENSE) License © 2022-PRESENT [yangjinming](https://github.com/2214962083)
