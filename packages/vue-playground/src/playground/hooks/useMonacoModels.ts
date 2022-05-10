import {Monaco, MonacoEditor} from '../utils/types-helper'
import {ref, unref, watch} from 'vue'
import {MaybeRef, tryOnUnmounted} from '@vueuse/core'
import {File} from '../../core'
import {getFileLanguage, getFileUri, mustBeRef} from '../utils/common'

export interface UseMonacoModelsOptions {
  projectId: MaybeRef<string>
  files: MaybeRef<File[]>
  monaco: Monaco
  getEditor: () => MonacoEditor.IStandaloneCodeEditor | undefined
  editorUpdateId: MaybeRef<number>
  isSetup: MaybeRef<boolean>
}

export function useMonacoModels(options: UseMonacoModelsOptions) {
  const {projectId, files, isSetup, monaco, getEditor, editorUpdateId} = options
  const modelUpdateId = ref(0)
  let models: MonacoEditor.ITextModel[] | null = []
  const getModels = () => models

  const setModels = (_models: MonacoEditor.ITextModel[] | null) => {
    models = _models
    modelUpdateId.value++
  }

  tryOnUnmounted(() => {
    if (models) {
      models.forEach(model => model.dispose())
      setModels(null)
    }
  })

  watch(
    [mustBeRef(files), mustBeRef(projectId), mustBeRef(isSetup), mustBeRef(editorUpdateId)],
    () => {
      if (!unref(isSetup) || !getEditor() || !unref(projectId)) return

      if (!models || !models.length) {
        const newModels = unref(files).map(file => {
          return monaco.editor.createModel(
            file.code,
            getFileLanguage(file),
            getFileUri(monaco, unref(projectId), file.filename)
          )
        })
        console.log('newModels', newModels)
        setModels(newModels)
      } else {
        models.forEach(model => {
          const latestCode = unref(files).find(
            file => getFileUri(monaco, unref(projectId), file.filename).path === model.uri.path
          )?.code
          if (!model.isDisposed() && model.getValue() !== latestCode) {
            model.setValue(latestCode ?? '')
          }
        })
      }
    },
    {
      deep: true,
      immediate: true
    }
  )

  return {getModels, modelUpdateId}
}
