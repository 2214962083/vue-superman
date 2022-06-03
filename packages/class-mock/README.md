<div align="center">
  <a href="https://vue-superman.vercel.app/">
    <img src="https://vue-superman.vercel.app/images/logo.svg" width="150">
  </a>
  <h1>class-mock</h1>
  <p>A mock library that lets you use decorators with classes to generate fake data.</p>
  <p>
    <h3><span>English</span>&emsp;|&emsp;<a href="./README_zh-CN.md">简体中文</a></h3>
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

## Introduction

A mock library that lets you use decorators with classes to generate fake data. Based on [@faker-js/faker](https://github.com/faker-js/faker)。

`class-mock` decorators essentially just stores metadata (configuration data) and does not modify the class.

Finally, when `createMock(MockClass)` is executed, all metadata (configuration data) of `MockClass` will be taken out, and then data generation will be performed with `@faker-js/faker`.

Supports any `ts` project or [@babel/plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) (`legacy` is `true`) `js` project.

## Installation

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

## Usage

The usage is documented in the [documentation](https://vue-superman.vercel.app/libs/class-mock/).

## Notice

`ts` project needs to be configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Acknowledgement

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
