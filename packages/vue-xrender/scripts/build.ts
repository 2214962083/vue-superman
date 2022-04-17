import {build, UserConfig} from 'vite'
import rimraf from 'rimraf'
import path from 'path'
import {minifyConfig, unMinifyConfig} from '../vite.config'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

async function changeConfig(config: UserConfig) {
  if (!config.build) config.build = {}

  // don not clear dist folder
  config.build.emptyOutDir = false

  console.log('build config:', config.build.minify)

  if (config.build.minify) {
    // if minify generate dts

    if (!config.plugins) config.plugins = []

    const dts = (await import('vite-plugin-dts')).default

    config.plugins.push(
      dts({
        insertTypesEntry: true,
        tsConfigFilePath: pathResolve('../tsconfig.json')
      })
    )
  }
  return config
}

async function main() {
  await rimraf.sync(pathResolve('../dist/**/*'))

  // build un minify
  await build(await changeConfig(unMinifyConfig))

  // build minify
  await build(await changeConfig(minifyConfig))
}

main()
