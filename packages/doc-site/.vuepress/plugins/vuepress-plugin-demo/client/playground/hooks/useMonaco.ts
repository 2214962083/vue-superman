import {generateProjectId, mustBeRef} from './../utils/common'
/* eslint-disable @typescript-eslint/no-empty-function */
import {ref, Ref, unref, watch} from 'vue'
import {tryOnScopeDispose, MaybeRef, createEventHook, tryOnUnmounted, EventHookOn} from '@vueuse/core'
import darkTheme from 'theme-vitesse/themes/vitesse-dark.json'
import lightTheme from 'theme-vitesse/themes/vitesse-light.json'
import {useEditors} from './useEditor'
import {setupMonaco} from '../monaco'
import {File} from '../../core'
import {useMonacoModels} from './useMonacoModels'
import {toggleDark, isDark} from './index'

import {MonacoEditor} from '../utils/types-helper'

export interface UseMonacoOptions {
  activeFile: MaybeRef<File>
  files: MaybeRef<File[]>
}

export interface ChangeEvent {
  newCode: string
  activeFile: File
}

const {addEditor} = useEditors()

export function useMonaco(target: Ref<HTMLElement | undefined>, options: UseMonacoOptions) {
  const {activeFile, files} = options
  const changeEventHook = createEventHook<ChangeEvent>()
  const isSetup = ref(false)
  const editorUpdateId = ref(0)
  const editorStateCacheMap = ref<Map<string, MonacoEditor.ICodeEditorViewState | null>>(new Map())
  const disposeEditor = ref<() => void>(() => {})
  let editor: MonacoEditor.IStandaloneCodeEditor
  const getEditor = () => editor

  const init = async () => {
    const {monaco} = await setupMonaco()
    if (!monaco) return

    monaco.editor.defineTheme('vitesse-dark', darkTheme as unknown as MonacoEditor.IStandaloneThemeData)
    monaco.editor.defineTheme('vitesse-light', lightTheme as unknown as MonacoEditor.IStandaloneThemeData)
    const {getModels, modelUpdateId} = useMonacoModels({
      projectId: generateProjectId(),
      files,
      isSetup,
      monaco,
      getEditor,
      editorUpdateId
    })

    watch(
      target,
      () => {
        const el = unref(target)

        if (!el) return

        console.log('el', el)

        editor = monaco.editor.create(el, {
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
        }) as MonacoEditor.IStandaloneCodeEditor

        console.log('editor', el, editor)

        disposeEditor.value = addEditor(editor)

        isSetup.value = true
        editorUpdateId.value++

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
        const activeModel = getModels()?.find(model => model.uri.path.endsWith(activeFileName))
        if (editor && activeModel && !activeModel.isDisposed() && editor.getModel() !== activeModel) {
          editor.setModel(activeModel)
          editor.onDidChangeModelContent(() => {
            const value = editor!.getValue()
            changeEventHook.trigger({
              newCode: value,
              activeFile: unref(activeFile)
            })
          })

          const cacheState = editorStateCacheMap.value.get(activeFileName)
          if (cacheState) editor.restoreViewState(cacheState)
        }
      },
      {immediate: true}
    )

    // watch(isDark, () => monaco.editor.setTheme(isDark.value ? 'vitesse-dark' : 'vitesse-light'), {immediate: true})
  }

  init()

  tryOnScopeDispose(() => {
    disposeEditor.value()
  })

  tryOnUnmounted(() => {
    editorStateCacheMap.value = new Map()
    disposeEditor.value()
  })

  return {
    getEditor,
    isDark,
    toggleDark,
    disposeEditor,
    onChange: changeEventHook.on as EventHookOn<ChangeEvent>
  }
}
