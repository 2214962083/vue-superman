/* eslint-disable @typescript-eslint/no-explicit-any */
import type {editor as Editor} from 'monaco-editor'
import {createEventHook, EventHookOn} from '@vueuse/core'

const onEditorCreatedHook = createEventHook<{id: string; editor: Editor.IStandaloneCodeEditor}>()
const onEditorDestroyedHook = createEventHook<{id: string}>()
const editors: Record<string, Editor.IStandaloneCodeEditor> = {}
let id = 0

interface EventHookOnParam {
  id: string
  editor?: Editor.IStandaloneCodeEditor
}

/**
 * Provides a global store of all the monaco editors in the page.
 */
export function useEditors() {
  const removeEditor = (id: string) => {
    return () => {
      editors[id].dispose()
      delete editors[id]
      onEditorDestroyedHook.trigger({id})
    }
  }

  const addEditor = (editor: Editor.IStandaloneCodeEditor) => {
    id++
    editors[id] = editor
    onEditorCreatedHook.trigger({id: id.toString(), editor})
    return removeEditor(id.toString())
  }

  return {
    editors,
    addEditor,
    onEditorCreated: onEditorCreatedHook.on as EventHookOn<EventHookOnParam>,
    onEditorDestroyed: onEditorDestroyedHook.on as EventHookOn<EventHookOnParam>
  }
}
