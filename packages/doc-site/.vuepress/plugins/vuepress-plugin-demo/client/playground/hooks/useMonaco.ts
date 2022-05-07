/* eslint-disable @typescript-eslint/no-empty-function */
import {ref, Ref, unref, watch} from 'vue'
import {until, tryOnScopeDispose, MaybeRef, createEventHook, EventHookOn} from '@vueuse/core'
import darkTheme from 'theme-vitesse/themes/vitesse-dark.json'
import lightTheme from 'theme-vitesse/themes/vitesse-light.json'
import * as monaco from 'monaco-editor'
import {useEditors} from './useEditor'
import {setLanguage, setWorker} from '../monaco'
import {isDark} from './index'

export interface UseMonacoOptions {
  model: MaybeRef<monaco.editor.ITextModel>
}

const {addEditor} = useEditors()

export function useMonaco(target: Ref, options: UseMonacoOptions) {
  const changeEventHook = createEventHook<string>()
  const isSetup = ref(false)
  let editor: monaco.editor.IStandaloneCodeEditor
  let disposeEditor: () => void = () => {}

  watch(
    () => unref(options.model),
    async () => {
      await until(isSetup).toBeTruthy()

      if (editor) editor.setModel(unref(options.model))
    },
    {immediate: true}
  )

  const init = async () => {
    setWorker()
    setLanguage()
    monaco.editor.defineTheme('vitesse-dark', darkTheme as unknown as monaco.editor.IStandaloneThemeData)
    monaco.editor.defineTheme('vitesse-light', lightTheme as unknown as monaco.editor.IStandaloneThemeData)

    watch(
      target,
      () => {
        const el = unref(target)

        if (!el) return

        editor = monaco.editor.create(el, {
          tabSize: 2,
          insertSpaces: true,
          autoClosingQuotes: 'always',
          detectIndentation: false,
          folding: false,
          automaticLayout: true,
          theme: 'vitesse-dark',
          minimap: {
            enabled: false
          }
        })

        console.log('editor', el, editor)

        disposeEditor = addEditor(editor)

        isSetup.value = true

        editor.onDidChangeModelContent(() => {
          const value = editor.getValue()
          changeEventHook.trigger(value)
        })
      },
      {
        flush: 'post',
        immediate: true
      }
    )

    watch(
      isDark,
      () => (isDark.value ? monaco.editor.setTheme('vitesse-dark') : monaco.editor.setTheme('vitesse-light')),
      {immediate: true}
    )
  }

  init()

  tryOnScopeDispose(() => {
    stop()
    if (disposeEditor) disposeEditor()
  })

  return {
    disposeEditor,
    onChange: changeEventHook.on as EventHookOn<string>
  }
}
