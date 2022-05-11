// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {createSingletonPromise, SingletonPromiseReturn} from '../utils/common'
import {Monaco, PlaygroundLifeCycle} from '../utils/types-helper'
import {setLanguage} from './language'
import {loadWorkers} from './worker'

export const loadMonacoImport = createSingletonPromise(async () => {
  if (typeof window !== 'undefined') return (await import('monaco-editor')) as Monaco
  return null
})

export const setupMonaco = createSingletonPromise(async (lifeCycle?: PlaygroundLifeCycle) => {
  const monaco = await loadMonacoImport()
  if (!monaco) return {monaco: null}

  await setLanguage(monaco, lifeCycle)
  await loadWorkers(monaco, lifeCycle)

  return {monaco}
})
