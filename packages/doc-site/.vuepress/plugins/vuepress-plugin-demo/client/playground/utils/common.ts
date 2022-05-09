import {computed, unref} from 'vue'
import {MaybeRef} from '@vueuse/core'
import * as monaco from 'monaco-editor'
import path from 'path-browserify'
import {File} from '../../core'
import {FILE_NAME_PREFIX, FILE_BASE_URL} from '../constants'

export const getFileUri = (id: string, filename: string) => {
  console.log(`${FILE_BASE_URL}${path.join(id, filename)}`)
  console.log(monaco.Uri.parse(`${FILE_BASE_URL}${path.join(id, filename)}`))
  return monaco.Uri.parse(`${FILE_BASE_URL}${path.join(id, filename)}`)
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
    case 'vue':
      return 'html'
    case 'css':
      return 'css'
    default:
      return 'plaintext'
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

export const safeId = (id?: string) => hash(id ? id : genRandomStr())

export const generateMonacoFileId = (id: string | number) => FILE_NAME_PREFIX + safeId(String(id) ?? genRandomStr())

export const mustBeRef = <T>(value: MaybeRef<T>) => computed(() => unref(value))
