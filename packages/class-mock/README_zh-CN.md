<div align="center">
  <a href="https://vue-superman.vercel.app/">
    <img src="https://vue-superman.vercel.app/images/logo.svg" width="150">
  </a>
  <h1>class-mock</h1>
  <p>一个可以让你用装饰器配合 class 生成假数据的 mock 库。基于 faker.js 库。</p>
  <p>
    <h3><a href="./">English</a>&emsp;|&emsp;<span>简体中文</span></h3>
  </p>
  <p>
    <img src="https://img.shields.io/npm/v/class-mock?style=flat-square" alt="version">
    <img src="https://img.shields.io/npm/dependency-version/class-mock/@faker-js/faker" alt="@faker-js/faker">
    <img src="https://img.shields.io/npm/l/class-mock.svg" alt="license">
    <img src="https://img.shields.io/codecov/c/github/2214962083/vue-superman" alt="coverage">
    <img src="https://img.badgesize.io/https://unpkg.com/class-mock/dist/index.min.umd.js?compression=gzip&label=gzip" alt="gzip" />
    <img src="https://img.shields.io/github/stars/2214962083/vue-superman?style=social" alt="stars">
  </p>
</div>

## 介绍

一个可以让你用装饰器配合 class 生成假数据的 mock 库。基于 [@faker-js/faker](https://github.com/faker-js/faker)。

`class-mock` 装饰器本质只是存储元数据（配置数据），并不会对类进行修改。

最后在 `createMock(MockClass)` 执行时，会取出 `MockClass` 的所有元数据（配置数据），然后配合 `@faker-js/faker` 进行数据生成。

支持任何 `ts` 项目或装了 [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) (`legacy` 为 `true`) 的 `js` 项目。

## 安装

for npm

```bash
npm i class-mock @faker-js/faker
```

for yarn

```bash
yarn add class-mock @faker-js/faker
```

for pnpm

```bash
pnpm add class-mock @faker-js/faker
```

## 使用

点击查看[使用文档](https://vue-superman.vercel.app/zh/libs/class-mock/)。

## 注意

`ts` 项目需要在 `tsconfig.json` 配置

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 致谢

- [class-transformer](https://github.com/typestack/class-transformer)
- [class-validator](https://github.com/typestack/class-validator)
- [typeorm](https://github.com/typeorm/typeorm)

## Contributing

Learn about contribution [here](https://github.com/2214962083/vue-superman/blob/master/CONTRIBUTING.md).

This project exists thanks to all the people who contribute:

<a href="https://github.com/2214962083/vue-superman/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=2214962083/vue-superman" />
</a>

## License

[MIT](https://github.com/2214962083/vue-superman/blob/master/LICENSE) License © 2022-PRESENT [yangjinming](https://github.com/2214962083)
