import * as monaco from 'monaco-editor'
import {onUnmounted, ref, unref, watch} from 'vue'
import {MaybeRef} from '@vueuse/core'
import {File} from '../../core'
import {getFileLanguage, getFileUri, mustBeRef} from '../utils/common'

export interface UseMonacoModelsOptions {
  id: MaybeRef<string>
  files: MaybeRef<File[]>
}

export function useMonacoModels(options: UseMonacoModelsOptions) {
  const {id, files} = options
  const modelUpdateId = ref(0)
  const models = ref<monaco.editor.ITextModel[] | null>([])

  const setModels = (_models: monaco.editor.ITextModel[] | null) => {
    models.value = _models
    modelUpdateId.value++
  }

  onUnmounted(() => {
    if (models.value) {
      models.value.forEach(model => model.dispose())
      setModels(null)
    }
  })

  watch(
    [mustBeRef(files), mustBeRef(id)],
    () => {
      if (!models.value || !models.value.length) {
        return
        const newModels = unref(files).map(file => {
          return monaco.editor.createModel(file.code, getFileLanguage(file), getFileUri(unref(id), file.filename))
        })
        console.log('newModels', newModels)
        setModels(newModels)
      } else {
        models.value.forEach(model => {
          const latestCode = unref(files).find(
            file => getFileUri(unref(id), file.filename).path === model.uri.path
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

  return {models, modelUpdateId}
}
