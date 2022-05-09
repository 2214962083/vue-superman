/* eslint-disable @typescript-eslint/no-empty-function */
import {ref, Ref, unref, watch, onUnmounted} from 'vue'
import {tryOnScopeDispose, MaybeRef, createEventHook, EventHookOn} from '@vueuse/core'
import darkTheme from 'theme-vitesse/themes/vitesse-dark.json'
import lightTheme from 'theme-vitesse/themes/vitesse-light.json'
import * as monaco from 'monaco-editor'
import {useEditors} from './useEditor'
import {setLanguage, setWorker} from '../monaco'
import {File} from '../../core'
import {useMonacoModels} from './useMonacoModels'
import {toggleDark, isDark} from './index'
import {mustBeRef} from '../utils/common'

export interface UseMonacoOptions {
  id: MaybeRef<string>
  activeFile: MaybeRef<File>
  files: MaybeRef<File[]>
}

export interface ChangeEvent {
  newCode: string
  activeFile: File
}

const {addEditor} = useEditors()

export function useMonaco(target: Ref<HTMLElement | undefined>, options: UseMonacoOptions) {
  const {id, activeFile, files} = options
  const changeEventHook = createEventHook<ChangeEvent>()
  const isSetup = ref(false)
  const editor = ref<monaco.editor.IStandaloneCodeEditor>()
  const editorStateCacheMap = ref<Map<string, monaco.editor.ICodeEditorViewState | null>>(new Map())
  const disposeEditor = ref<() => void>(() => {})

  setWorker()
  setLanguage()
  monaco.editor.defineTheme('vitesse-dark', darkTheme as unknown as monaco.editor.IStandaloneThemeData)
  monaco.editor.defineTheme('vitesse-light', lightTheme as unknown as monaco.editor.IStandaloneThemeData)
  const {models, modelUpdateId} = useMonacoModels({id, files})

  watch(
    target,
    () => {
      const el = unref(target)

      if (!el) return

      console.log('el', el)

      editor.value = monaco.editor.create(el, {
        tabSize: 2,
        insertSpaces: true,
        autoClosingQuotes: 'always',
        detectIndentation: false,
        folding: true,
        automaticLayout: true,
        smoothScrolling: true,
        theme: 'vitesse-dark',
        minimap: {
          enabled: true
        }
      })

      console.log('editor', el, editor.value)

      disposeEditor.value = addEditor(editor.value)

      isSetup.value = true

      // editor.value.onDidFocusEditorText(() => {
      //   editor.value?.updateOptions({
      //     scrollbar: {
      //       handleMouseWheel: true
      //     }
      //   })
      // })

      // editor.value.onDidBlurEditorText(() => {
      //   editor.value?.updateOptions({
      //     scrollbar: {
      //       handleMouseWheel: false
      //     }
      //   })
      // })
    },
    {
      immediate: true
    }
  )

  watch(
    [mustBeRef(activeFile), disposeEditor, modelUpdateId, editorStateCacheMap],
    async () => {
      const activeFileName = unref(activeFile)?.filename
      const activeModel = models.value?.find(model => model.uri.path.endsWith(activeFileName))
      if (editor.value && activeModel && !activeModel.isDisposed() && editor.value.getModel() !== activeModel) {
        editor.value.setModel(activeModel)
        editor.value.onDidChangeModelContent(() => {
          const value = editor.value!.getValue()
          changeEventHook.trigger({
            newCode: value,
            activeFile: unref(activeFile)
          })
        })

        const cacheState = editorStateCacheMap.value.get(activeFileName)
        if (cacheState) editor.value.restoreViewState(cacheState)
      }
    },
    {immediate: true}
  )

  watch(
    isDark,
    () => (isDark.value ? monaco.editor.setTheme('vitesse-dark') : monaco.editor.setTheme('vitesse-light')),
    {immediate: true}
  )

  tryOnScopeDispose(() => {
    stop()
    disposeEditor.value()
  })

  onUnmounted(() => {
    editorStateCacheMap.value = new Map()
    disposeEditor.value()
  })

  return {
    editor,
    isDark,
    toggleDark,
    disposeEditor,
    onChange: changeEventHook.on as EventHookOn<ChangeEvent>
  }
}
