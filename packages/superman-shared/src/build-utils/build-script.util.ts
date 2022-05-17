import {build as viteBuild, InlineConfig, UserConfig} from 'vite'
import rimraf from 'rimraf'
import path from 'path'
import dts from 'vite-plugin-dts'

export const WATCH = Boolean(process.env.WATCH)

export type DtsOptions = Parameters<typeof dts>[0]

export interface ChangeConfigOptions {
  genDts?: boolean
  dtsOptions?: DtsOptions
  watch?: boolean
  packagePath: string
}

export async function changeViteConfig(config: UserConfig, options: ChangeConfigOptions): Promise<InlineConfig> {
  const {genDts = false, watch = false, dtsOptions, packagePath} = options

  const pathResolve = (..._path: string[]) => path.resolve(packagePath, ..._path)

  if (!config.build) config.build = {}
  if (!config.plugins) config.plugins = []

  // don not clear dist folder
  config.build.emptyOutDir = false

  if (genDts) {
    config.plugins.push(
      dts({
        insertTypesEntry: true,
        tsConfigFilePath: pathResolve('./tsconfig.json'),
        ...dtsOptions
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
  dtsOptions?: DtsOptions
  changeConfigFn?: ChangeConfigFn
}

export async function build(config: BuildOptions) {
  const {minifyConfig, unMinifyConfig, packagePath, changeConfigFn = changeViteConfig, dtsOptions} = config

  const pathResolve = (..._path: string[]) => path.resolve(packagePath, ..._path)

  // clear dist folder
  await rimraf.sync(pathResolve('./dist/**/*'))

  if (!WATCH) {
    // build minify, don't build in watch mode
    await viteBuild(await changeConfigFn(minifyConfig, {packagePath, dtsOptions}))
  }

  // build un minify
  await viteBuild(await changeConfigFn(unMinifyConfig, {genDts: true, watch: WATCH, packagePath, dtsOptions}))
}
