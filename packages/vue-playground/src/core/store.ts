/* eslint-disable @typescript-eslint/no-explicit-any */
import {version, reactive, watchEffect} from 'vue'
import * as defaultCompiler from 'vue/compiler-sfc'
import {compileFile} from './compiler/transform'
import {utoa, atou} from './utils/common'
import {ImportMap, OutputModes} from './utils/types-helper'
import {SFCScriptCompileOptions, SFCAsyncStyleCompileOptions, SFCTemplateCompileOptions} from 'vue/compiler-sfc'
import {DEFAULT_VUE_RUNTIME_DOM_CDN, DEFAULT_VUE_COMPILER_SFC_CDN} from '../playground/constants'
import type {PlaygroundPkgCdn} from '../playground/utils/types-helper'

const defaultMainFile = 'App.vue'

const welcomeCode = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template>
`.trim()

export class File {
  filename: string
  code: string
  hidden: boolean
  compiled = {
    js: '',
    css: '',
    ssr: ''
  }

  constructor(filename: string, code = '', hidden = false) {
    this.filename = filename
    this.code = code
    this.hidden = hidden
  }
}

export interface StoreState {
  mainFile: string
  files: Record<string, File>
  initFiles: Record<string, File>
  activeFile: File
  errors: (string | Error)[]
  vueRuntimeURL: string
}

export interface SFCOptions {
  script?: Omit<SFCScriptCompileOptions, 'id'>
  style?: SFCAsyncStyleCompileOptions
  template?: SFCTemplateCompileOptions
}

export interface Store {
  state: StoreState
  options?: SFCOptions
  compiler: typeof import('vue/compiler-sfc')
  setActive: (filename: string) => void
  addFile: (filename: string | File) => void
  deleteFile: (filename: string) => void
  getImportMap: () => any
  initialShowOutput: boolean
  initialOutputMode: OutputModes
}

interface ReplStoreOptions {
  serializedState?: string
  initFiles?: File[]
  showOutput?: boolean
  // loose type to allow getting from the URL without inducing a typing error
  outputMode?: OutputModes | string
  defaultVueRuntimeURL?: string
  pkgCdn?: PlaygroundPkgCdn
  initImportMap?: ImportMap
}

export class ReplStore implements Store {
  state: StoreState
  compiler = defaultCompiler
  options?: SFCOptions
  initialShowOutput: boolean
  initialOutputMode: OutputModes
  pkgCdn?: PlaygroundPkgCdn

  private defaultVueRuntimeURL: string
  private pendingCompiler: Promise<any> | null = null

  constructor({
    serializedState = '',
    defaultVueRuntimeURL,
    showOutput = false,
    outputMode = 'preview',
    initFiles,
    initImportMap,
    pkgCdn
  }: ReplStoreOptions = {}) {
    let files: StoreState['files'] = {}

    if (serializedState) {
      const saved = JSON.parse(atou(serializedState))
      for (const filename in saved) {
        files[filename] = new File(filename, saved[filename])
      }
    } else if (initFiles) {
      for (const file of initFiles) {
        files[file.filename] = file
      }
    } else {
      files = {
        [defaultMainFile]: new File(defaultMainFile, welcomeCode)
      }
    }

    this.defaultVueRuntimeURL =
      defaultVueRuntimeURL ||
      pkgCdn?.['@vue/runtime-dom']?.(version, '/dist/runtime-dom.esm-browser.js') ||
      DEFAULT_VUE_RUNTIME_DOM_CDN(version)

    this.initialShowOutput = showOutput
    this.initialOutputMode = outputMode as OutputModes
    this.pkgCdn = pkgCdn

    let mainFile = defaultMainFile
    if (!files[mainFile]) {
      mainFile = Object.keys(files)[0]
    }
    this.state = reactive({
      mainFile,
      files,
      initFiles: files,
      activeFile: files[mainFile],
      errors: [],
      vueRuntimeURL: this.defaultVueRuntimeURL
    })

    this.initImportMap(initImportMap)

    watchEffect(() => compileFile(this, this.state.activeFile))

    for (const file in this.state.files) {
      if (file !== defaultMainFile) {
        compileFile(this, this.state.files[file])
      }
    }
  }

  setActive(filename: string) {
    this.state.activeFile = this.state.files[filename]
  }

  addFile(fileOrFilename: string | File): void {
    const file = typeof fileOrFilename === 'string' ? new File(fileOrFilename) : fileOrFilename
    this.state.files[file.filename] = file
    if (!file.hidden) this.setActive(file.filename)
  }

  deleteFile(filename: string) {
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
      if (this.state.activeFile.filename === filename) {
        this.state.activeFile = this.state.files[this.state.mainFile]
      }
      delete this.state.files[filename]
    }
  }

  serialize() {
    return '#' + utoa(JSON.stringify(this.getFiles()))
  }

  getFiles() {
    const exported: Record<string, string> = {}
    for (const filename in this.state.files) {
      exported[filename] = this.state.files[filename].code
    }
    return exported
  }

  async setFiles(newFiles: Record<string, string>, mainFile = defaultMainFile) {
    const files: Record<string, File> = {}
    if (mainFile === defaultMainFile && !newFiles[mainFile]) {
      files[mainFile] = new File(mainFile, welcomeCode)
    }
    for (const filename in newFiles) {
      files[filename] = new File(filename, newFiles[filename])
    }
    for (const file in files) {
      await compileFile(this, files[file])
    }
    this.state.mainFile = mainFile
    this.state.files = files
    this.initImportMap()
    this.setActive(mainFile)
  }

  private initImportMap(initImportMap?: ImportMap) {
    const map = this.state.files['import-map.json']
    if (!map) {
      this.state.files['import-map.json'] = new File(
        'import-map.json',
        JSON.stringify(
          {
            imports: {
              vue: this.defaultVueRuntimeURL,
              ...initImportMap?.imports
            }
          },
          null,
          2
        )
      )
    } else {
      try {
        const json = JSON.parse(map.code)
        if (!json.imports.vue) {
          json.imports.vue = this.defaultVueRuntimeURL
          Object.assign(json.imports, initImportMap?.imports)
          map.code = JSON.stringify(json, null, 2)
        }
      } catch (e) {
        // ignore
      }
    }
  }

  getImportMap() {
    try {
      return JSON.parse(this.state.files['import-map.json'].code)
    } catch (e) {
      this.state.errors = [`Syntax error in import-map.json: ${(e as Error).message}`]
      return {}
    }
  }

  setImportMap(map: ImportMap) {
    this.state.files['import-map.json']!.code = JSON.stringify(map, null, 2)
  }

  async setVueVersion(version: string) {
    const compilerUrl =
      this.pkgCdn?.['@vue/compiler-sfc']?.(version, '/dist/compiler-sfc.esm-browser.js') ||
      DEFAULT_VUE_COMPILER_SFC_CDN(version)

    const runtimeUrl =
      this.pkgCdn?.['@vue/runtime-dom']?.(version, '/dist/runtime-dom.esm-browser.js') ||
      DEFAULT_VUE_RUNTIME_DOM_CDN(version)

    this.pendingCompiler = import(/* @vite-ignore */ compilerUrl)
    this.compiler = await this.pendingCompiler
    this.pendingCompiler = null
    this.state.vueRuntimeURL = runtimeUrl
    const importMap = this.getImportMap()
    ;(importMap.imports || (importMap.imports = {})).vue = runtimeUrl
    this.setImportMap(importMap)
    console.info(`[@vue/repl] Now using Vue version: ${version}`)
  }

  resetVueVersion() {
    this.compiler = defaultCompiler
    this.state.vueRuntimeURL = this.defaultVueRuntimeURL
  }
}
