import {build as viteBuild, InlineConfig, UserConfig} from 'vite'
import rimraf from 'rimraf'
import path from 'path'
import dts from 'vite-plugin-dts'

export const WATCH = Boolean(process.env.WATCH)

export interface ChangeConfigOptions {
  genDts?: boolean
  watch?: boolean
  packagePath: string
}

export async function changeViteConfig(config: UserConfig, options: ChangeConfigOptions): Promise<InlineConfig> {
  const {genDts = false, watch = false, packagePath} = options

  const pathResolve = (..._path: string[]) => path.resolve(packagePath, ..._path)

  if (!config.build) config.build = {}
  if (!config.plugins) config.plugins = []

  // don not clear dist folder
  config.build.emptyOutDir = false

  if (genDts) {
    config.plugins.push(
      dts({
        insertTypesEntry: true,
        tsConfigFilePath: pathResolve('./tsconfig.json')
      })
    )
  }

  if (watch) {
    config.build.watch = {
      include: pathResolve('./src/**/*')
    }
  }

  return <InlineConfig>{
    ...config,
    configFile: false // don't use vite.config.ts
  }
}

export type ChangeConfigFn = (config: UserConfig, options: ChangeConfigOptions) => Promise<InlineConfig>
export interface BuildOptions {
  minifyConfig: UserConfig
  unMinifyConfig: UserConfig
  packagePath: string
  changeConfigFn?: ChangeConfigFn
}

export async function build(config: BuildOptions) {
  const {minifyConfig, unMinifyConfig, packagePath, changeConfigFn = changeViteConfig} = config

  const pathResolve = (..._path: string[]) => path.resolve(packagePath, ..._path)

  // clear dist folder
  await rimraf.sync(pathResolve('./dist/**/*'))

  if (!WATCH) {
    // build minify, don't build in watch mode
    await viteBuild(await changeConfigFn(minifyConfig, {packagePath}))
  }

  // build un minify
  await viteBuild(await changeConfigFn(unMinifyConfig, {genDts: true, watch: WATCH, packagePath}))
}
