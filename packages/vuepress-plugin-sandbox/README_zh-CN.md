<div align="center">
  <a href="https://vue-superman.vercel.app/">
    <img src="https://vue-superman.vercel.app/images/logo.svg" width="150">
  </a>
  <h1>vuepress-plugin-sandbox</h1>
  <p>它是一个基于 vue-playground 的 vuepress 插件，支持快速书写实时编辑、实时编译、实时预览的 demo</p>
  <p>
    <h3><a href="./">English</a>&emsp;|&emsp;<span>简体中文</span></h3>
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

## 介绍

`vuepress-plugin-sandbox` 是一个基于 [vue-playground](../vue-playground/README_zh-CN.md) 的 `vuepress v2` 插件。

它是一个支持实时编辑、实时编译、实时预览的 demo 插件。类似小型的 [codesandbox](https://codesandbox.io/)。

## 功能

- 实时编辑，实时编译 `(vue3、js、ts、jsx、tsx、css)` ，实时运行，实时预览
- 支持自定义 `import` 映射
- 支持新建文件，删除文件，支持
- 编辑器支持 `ts` 类型提示（仅限 `.ts` 文件）
- 支持切换布局，支持全屏
- 支持暗黑模式
- 支持自定义主题色

## 安装

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

## 使用

点击查看[使用文档](https://vue-superman.vercel.app/zh/libs/vuepress-plugin-sandbox/).

## 注意

因为 `vuepress v2` 还在 beta 阶段，所以插件还不稳定，但是会尽量跟上最新的 `vuepress v2` 版本。

目前支持 `vuepress@2.0.0-beta.40` 及以上版本。

因为 `vuepress-plugin-sandbox` 基于 [vue-playground](../vue-playground/README_zh-CN.md)， 而 [vue-playground](../vue-playground/README_zh-CN.md) 又依赖于 [monaco-editor](https://github.com/microsoft/monaco-editor) 和 [@babel/standalone](https://babeljs.io/docs/en/babel-standalone)，所以打包后会比较大。

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
