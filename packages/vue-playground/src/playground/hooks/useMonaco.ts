/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {CreateEditorOptions, MonacoEditor, PlaygroundLifeCycle} from '../utils/types-helper'
import {generateProjectId, mustBeRef} from '../utils/common'

export interface UseMonacoOptions {
  themeName?: MaybeRef<string | undefined>
  lifeCycle?: MaybeRef<PlaygroundLifeCycle | undefined>
  activeFile: MaybeRef<File>
  files: MaybeRef<File[]>
}

export interface ChangeEvent {
  newCode: string
  activeFile: File
}

const {addEditor} = useEditors()

export function useMonaco(target: Ref<HTMLElement | undefined>, options: UseMonacoOptions) {
  const {activeFile, files, themeName} = options
  const changeEventHook = createEventHook<ChangeEvent>()
  const isSetup = ref(false)
  const editorUpdateId = ref(0)
  const editorStateCacheMap = ref<Map<string, MonacoEditor.ICodeEditorViewState | null>>(new Map())
  const disposeEditor = ref<() => void>(() => {})
  const loading = ref(false)
  let editor: MonacoEditor.IStandaloneCodeEditor
  const getEditor = () => editor

  const init = async () => {
    loading.value = true
    const lifeCycle = unref(options.lifeCycle)

    await lifeCycle?.beforeLoadMonaco?.()

    const {monaco} = await setupMonaco(lifeCycle)
    if (!monaco) return

    await lifeCycle?.afterLoadMonaco?.(monaco)

    monaco.editor.defineTheme('vitesse-dark', darkTheme as unknown as MonacoEditor.IStandaloneThemeData)
    monaco.editor.defineTheme('vitesse-light', lightTheme as unknown as MonacoEditor.IStandaloneThemeData)

    const defaultThemeMap = {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    } as const
    const getDefaultThemeName = () => defaultThemeMap[isDark.value ? 'dark' : 'light']
    const getThemeName = () => unref(themeName) || getDefaultThemeName()

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
      async () => {
        const el = unref(target)
        if (!el) return

        await lifeCycle?.beforeCreateEditor?.(monaco)

        const defaultEditorOptions: CreateEditorOptions = {
          tabSize: 2,
          insertSpaces: true,
          autoClosingQuotes: 'always',
          detectIndentation: false,
          folding: true,
          automaticLayout: true,
          smoothScrolling: true,
          theme: getThemeName(),
          minimap: {
            enabled: true
          }
        }

        const editorOptions =
          (await lifeCycle?.loadEditorOption?.(monaco, defaultEditorOptions)) || defaultEditorOptions

        editor = monaco.editor.create(el, editorOptions) as MonacoEditor.IStandaloneCodeEditor

        const _destroyEditor = addEditor(editor)
        disposeEditor.value = async () => {
          await lifeCycle?.beforeDestroyEditor?.(monaco, editor as any)
          _destroyEditor()
          await lifeCycle?.afterDestroyEditor?.(monaco)
        }

        isSetup.value = true
        editorUpdateId.value++

        await lifeCycle?.afterCreateEditor?.(monaco, editor as any)

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

    watch(
      () => unref(themeName),
      () => {
        console.log('themeName', unref(themeName), getThemeName())
        monaco.editor.setTheme(getThemeName())
      }
    )

    // watch(isDark, () => monaco.editor.setTheme(isDark.value ? 'vitesse-dark' : 'vitesse-light'), {immediate: true})

    loading.value = false
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
    loading,
    toggleDark,
    disposeEditor,
    onChange: changeEventHook.on as EventHookOn<ChangeEvent>
  }
}
