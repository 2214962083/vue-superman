// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {createSingletonPromise, SingletonPromiseReturn} from '@vueuse/core'
import {Monaco} from '../utils/types-helper'
import {setLanguage} from './language'
import {loadWorkers} from './worker'

export const loadMonacoImport = createSingletonPromise(async () => {
  if (typeof window !== 'undefined') return (await import('monaco-editor')) as Monaco
  return null
})

export const setupMonaco = createSingletonPromise(async () => {
  const monaco = await loadMonacoImport()
  if (!monaco) return {monaco: null}

  await setLanguage(monaco)
  await loadWorkers()

  return {monaco}
})
