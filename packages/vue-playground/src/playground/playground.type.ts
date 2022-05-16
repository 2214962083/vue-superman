import type {PropType, ExtractPropTypes} from 'vue'
import type {File, ImportMap} from '../core'
import type {PlaygroundLifeCycle, PlaygroundThemes} from './utils/types-helper'

export const playgroundProps = () =>
  ({
    files: {
      type: Array as PropType<File[]>,
      default: () => []
    },
    lifeCycle: {
      type: Object as PropType<PlaygroundLifeCycle>,
      default: () => ({})
    },
    themes: {
      type: Object as PropType<PlaygroundThemes>,
      default: () => ({})
    },
    importMap: {
      type: Object as PropType<ImportMap>,
      default: () => ({})
    }
  } as const)

export type PlaygroundProps = Readonly<ExtractPropTypes<ReturnType<typeof playgroundProps>>>
