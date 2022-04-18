import {build, InlineConfig, UserConfig} from 'vite'
import rimraf from 'rimraf'
import path from 'path'
import dts from 'vite-plugin-dts'
import {minifyConfig, unMinifyConfig} from '../vite.config'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

async function changeConfig(config: UserConfig): Promise<InlineConfig> {
  if (!config.build) config.build = {}

  // don not clear dist folder
  config.build.emptyOutDir = false

  if (config.build.minify) {
    // if minify generate dts

    if (!config.plugins) config.plugins = []

    config.plugins.push(
      dts({
        insertTypesEntry: true,
        tsConfigFilePath: pathResolve('../tsconfig.json')
      })
    )
  }

  return <InlineConfig>{
    ...config,
    configFile: false
  }
}

async function main() {
  await rimraf.sync(pathResolve('../dist/**/*'))

  // build un minify
  await build(await changeConfig(unMinifyConfig))

  // build minify
  await build(await changeConfig(minifyConfig))
}

main()
