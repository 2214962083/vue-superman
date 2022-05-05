import path from 'path'

const rootJson = path.resolve(__dirname, '../../../../package.json')
export const pkgInfo = require(rootJson)

export const version = pkgInfo.version as string
export const isProd = process.env.NODE_ENV === 'production'
