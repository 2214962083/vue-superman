import {Monaco, PlaygroundLifeCycle} from '../utils/types-helper'
import {createSingletonPromise} from '../utils/common'
import {registerLanguagesForMonaco, defaultCustomLangs} from './custom-language'
import pkg from '../../../package.json'
import {DEFAULT_ONIGURUMA_WASM_CDN} from '../constants'

export const setCustomLanguage = createSingletonPromise(async (monaco: Monaco, lifeCycle?: PlaygroundLifeCycle) => {
  const customLangs = (await lifeCycle?.loadCustomLanguages?.(monaco, defaultCustomLangs)) || defaultCustomLangs

  const onigWasmUrlVersion = pkg.dependencies['vscode-oniguruma']
  const onigWasmUrl = DEFAULT_ONIGURUMA_WASM_CDN(onigWasmUrlVersion)
  // pkgCdn?.['vscode-oniguruma']?.(onigWasmUrlVersion, '/release/onig.wasm') || DEFAULT_ONIGURUMA_WASM_CDN(onigWasmUrlVersion)

  await registerLanguagesForMonaco({
    monaco,
    customLangs,
    onigWasmUrl
  })
})
