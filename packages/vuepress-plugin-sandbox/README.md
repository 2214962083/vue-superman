<div align="center">
  <a href="https://vue-superman.vercel.app/">
    <img src="https://vue-superman.vercel.app/images/logo.svg" width="150">
  </a>
  <h1>vuepress-plugin-sandbox</h1>
  <p>It is a vuepress plugin based on vue-playground, which supports rapid writing of demos of real-time editing, real-time compilation, and real-time preview.</p>
  <p>
    <h3><span>English</span>&emsp;|&emsp;<a href="./README_zh-CN.md">简体中文</a></h3>
  </p>
  <p>
    <img src="https://img.shields.io/npm/v/vuepress-plugin-sandbox?style=flat-square" alt="version">
    <img src="https://img.shields.io/npm/dependency-version/vuepress-plugin-sandbox/monaco-editor" alt="monaco-editor">
    <img src="https://img.shields.io/npm/dependency-version/vuepress-plugin-sandbox/@vuepress/core" alt="@vuepress/core">
    <img src="https://img.shields.io/npm/l/vuepress-plugin-sandbox.svg" alt="license">
    <img src="https://img.shields.io/codecov/c/github/2214962083/vue-superman" alt="coverage">
    <img src="https://img.badgesize.io/https://unpkg.com/vuepress-plugin-sandbox?compression=gzip&label=gzip" alt="gzip" />
    <img src="https://img.shields.io/github/stars/2214962083/vue-superman?style=social" alt="stars">
  </p>
</div>

## Introduction

`vuepress-plugin-sandbox` is a `vuepress v2` plugin based on [vue-playground](../vue-playground/).

It is a demo plugin that supports real-time editing, real-time compilation, and real-time preview. Similar to the small [codesandbox](https://codesandbox.io/).

## Features

- Real-time editing, real-time compilation `(vue3, js, ts, jsx, tsx, css)`, real-time running, real-time preview
- Support for custom `import` mapping
- Support to create new files, delete files, support
- Editor supports `ts` type hinting (`.ts` files only)
- Support switching layout, support full screen
- Support dark mode
- Support custom theme color

## Installation

for npm

```bash
npm i vuepress-plugin-sandbox monaco-editor
```

for yarn

```bash
yarn add vuepress-plugin-sandbox monaco-editor
```

for pnpm

```bash
pnpm add vuepress-plugin-sandbox monaco-editor
```

## Usage

The usage is documented in the [documentation](https://vue-superman.vercel.app/libs/vuepress-plugin-sandbox/).

## Notice

Because `vuepress v2` is still in beta stage, the plugin is not stable yet, but will try to keep up with the latest `vuepress v2` version.

Currently `vuepress@2.0.0-beta.40` and above are supported.

Because `vuepress-plugin-sandbox` is based on [vue-playground](../vue-playground/), which in turn depends on [monaco-editor](https://github.com/microsoft/monaco-editor) and [@babel/standalone](https://babeljs.io/docs/en/babel-standalone), so it will be larger after packaging.

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
