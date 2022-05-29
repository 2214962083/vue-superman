/* eslint-disable @typescript-eslint/no-explicit-any */
import {computed, unref} from 'vue'
import {MaybeRef} from '@vueuse/core'
import {File} from '../../core'
import {PROJECT_ID_PREFIX, FILE_BASE_URL} from '../constants'
import {Monaco, PromiseFnReturnType} from './types-helper'

export const getProjectFileBaseUrl = (projectId: string) => `${FILE_BASE_URL}${projectId}/`

export const getFileUri = (mona: Monaco, projectId: string, filename: string) => {
  // console.log(mona.Uri.parse(`${getProjectFileBaseUrl(projectId)}${filename}`))
  return mona.Uri.parse(`${getProjectFileBaseUrl(projectId)}${filename}`)
}

export const getFileLanguage = (file: File) => {
  const ext = file.filename.split('.').pop()
  switch (ext) {
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'ts':
    case 'tsx':
      return 'typescript'
    // case 'vue':
    //   return 'html'
    case 'css':
      return 'css'
    default:
      return ext
  }
}

export const genRandomStr = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substring(0, 5)

export const hash = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; ++i) hash = Math.imul(31, hash) + str.charCodeAt(i)

  return '' + (hash | 0)
}

export const safeId = (id?: string) => hash(id ? String(id) : genRandomStr())

export const generateProjectId = (id?: string) => PROJECT_ID_PREFIX + safeId(id)

export const mustBeRef = <T>(value: MaybeRef<T>) => computed(() => unref(value))

export interface SingletonPromiseReturn<Args extends any[], R> {
  (...args: Args): Promise<R>
  /**
   * Reset current staled promise.
   * Await it to have proper shutdown.
   */
  reset: () => Promise<void>
}

export function createSingletonPromise<Fn extends (...args: any[]) => Promise<any>>(
  fn: Fn
): SingletonPromiseReturn<Parameters<Fn>, PromiseFnReturnType<Fn>> {
  type R = PromiseFnReturnType<Fn>
  let _promise: Promise<R> | undefined

  function wrapper(...args: Parameters<Fn>) {
    if (!_promise) _promise = fn(...args)
    return _promise
  }
  wrapper.reset = async () => {
    const _prev = _promise
    _promise = undefined
    if (_prev) await _prev
  }

  return wrapper
}
