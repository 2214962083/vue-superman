import path from 'path'
export * as navbar from './navbar'
export * as sidebar from './sidebar'

const rootJson = path.resolve(__dirname, '../../../../package.json')

export const pkgInfo = require(rootJson)

export const version = pkgInfo.version as string
