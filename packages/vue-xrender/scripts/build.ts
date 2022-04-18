import {build, InlineConfig, UserConfig} from 'vite'
import rimraf from 'rimraf'
import path from 'path'
import dts from 'vite-plugin-dts'
import {minifyConfig, unMinifyConfig} from '../vite.config'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)
const WATCH = Boolean(process.env.WATCH)

interface ChangeConfigOptions {
  genDts?: boolean
  watch?: boolean
}

async function changeConfig(config: UserConfig, options: ChangeConfigOptions = {}): Promise<InlineConfig> {
  const {genDts = false, watch = false} = options

  if (!config.build) config.build = {}
  if (!config.plugins) config.plugins = []

  // don not clear dist folder
  config.build.emptyOutDir = false

  if (genDts) {
    config.plugins.push(
      dts({
        insertTypesEntry: true,
        tsConfigFilePath: pathResolve('../tsconfig.json')
      })
    )
  }

  if (watch) {
    config.build.watch = {
      include: pathResolve('../src/**/*')
    }
  }

  return <InlineConfig>{
    ...config,
    configFile: false // don't use vite.config.ts
  }
}

async function main() {
  // clear dist folder
  await rimraf.sync(pathResolve('../dist/**/*'))

  if (!WATCH) {
    // build minify, don't build in watch mode
    await build(await changeConfig(minifyConfig))
  }

  // build un minify
  await build(await changeConfig(unMinifyConfig, {genDts: true, watch: WATCH}))
}

main()
