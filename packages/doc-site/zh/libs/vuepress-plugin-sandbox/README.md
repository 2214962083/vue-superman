# 介绍

`vuepress-plugin-sandbox` 是一个基于 [vue-playground](../vue-playground/) 的 `vuepress v2.0` 插件。

它是一个支持实时编辑、实时编译、实时预览的 demo 插件。类似小型的 [codesandbox](https://codesandbox.io/)。

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

## 注意

因为 `vuepress v2` 还在 beta 阶段，所以插件还不稳定，但是会尽量跟上最新的 `vuepress v2` 版本。

目前支持 `vuepress@2.0.0-beta.40` 及以上版本。

因为 `vuepress-plugin-sandbox` 基于 [vue-playground](../vue-playground/)， 而 [vue-playground](../vue-playground/) 又依赖于 [monaco-editor](https://github.com/microsoft/monaco-editor) ，它是 `vscode` 的一部分，所以打包后会比较大。
