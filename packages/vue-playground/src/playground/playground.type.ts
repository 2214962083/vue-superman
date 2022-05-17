import type {PropType, ExtractPropTypes} from 'vue'
import type {File, ImportMap} from '../core'
import {DEFAULT_TITLE} from './constants'
import type {PlaygroundLifeCycle, PlaygroundThemes} from './utils/types-helper'

export const playgroundProps = () =>
  ({
    title: {
      type: String,
      default: DEFAULT_TITLE
    },
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
