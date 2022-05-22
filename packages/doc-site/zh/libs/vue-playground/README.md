# 介绍

`vue-playground` 是一个基于 [monaco-editor](https://github.com/microsoft/monaco-editor) 的 `vue3` 组件。

它支持实时编辑、实时编译、实时预览。类似小型的 [codesandbox](https://codesandbox.io/)。

它拥有以下功能:

- 实时编辑，实时编译 `(vue3、js、ts、jsx、tsx、css)` ，实时运行，实时预览
- 支持自定义 `import` 映射
- 支持新建文件，删除文件，支持
- 编辑器支持 `ts` 类型提示（仅限 `.ts` 文件）
- 支持切换布局，支持全屏
- 支持暗黑模式
- 支持自定义主题色

## 安装

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

## 注意

本组件因为依赖于 [monaco-editor](https://github.com/microsoft/monaco-editor) ，它是 `vscode` 的一部分，所以打包后会比较大。

推荐用于 lowcode 项目。或者文档写 demo 。
