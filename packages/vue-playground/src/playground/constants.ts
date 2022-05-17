import type {MaybeRef} from '@vueuse/core'
import type {InjectionKey} from 'vue'
import type {Store} from '../core'
import type {PlaygroundTheme} from './utils/types-helper'

export const DEFAULT_TITLE = 'Demo' as const
export const PLAYGROUND_COMPONENT_NAME = 'Playground' as const
export const FILE_BASE_URL = 'file:///root/' as const
export const PROJECT_ID_PREFIX = 'project' as const
export const DEFAULT_FILE_NAME = 'comp.vue' as const
export const IMPORT_JSON_NAME = 'import-map.json' as const
export const STORE_INJECT_KEY = '__store__' as unknown as InjectionKey<Store>
export const CLEAR_CONSOLE_INJECT_KEY = '__clear_console__' as unknown as InjectionKey<MaybeRef<boolean>>
export const SHOW_IMPORT_MAP_INJECT_KEY = '__show_import_map__' as unknown as InjectionKey<MaybeRef<boolean>>
export const THEME_INJECT_KEY = '__theme__' as unknown as InjectionKey<MaybeRef<PlaygroundTheme>>
export const SHOW_DARK_MODE_INJECT_KEY = '__show_dark_mode__' as unknown as InjectionKey<MaybeRef<boolean>>

export const DEFAULT_THEME_COLOR = '#42b883'

export const GET_LIGHT_THEME = (theme?: PlaygroundTheme) => {
  const themeColor = theme?.['--theme-color'] || DEFAULT_THEME_COLOR
  return {
    '--editor-theme-name': 'vitesse-light',
    '--theme-color': themeColor,
    '--border-color': '#eaecef',
    '--bg-color': '#fff',
    '--toolbar-bg-color': '##eeeeee',
    '--toolbar-text-color': '#2c3e50',
    '--toolbar-icon-bg-color': '#fff',
    '--toolbar-icon-color': '#999',
    '--toolbar-icon-active-color': themeColor,
    '--preview-bg-color': '#fff',
    '--preview-text-color': '#2c3e50',
    '--file-manager-bg-color': '#fff',
    '--file-manager-text-color': '#94a3b8',
    '--file-manager-active-bg-color': '#fff',
    '--file-manager-active-text-color': themeColor,
    '--file-manager-right-float-bg': 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 25%)',
    '--message-warn-text-color': '#695f1b',
    '--message-warn-bg-color': '#f7f0cd',
    '--message-warn-border-color': '#695f1b',
    '--message-error-text-color': '#f00',
    '--message-error-bg-color': '#ffd7d7',
    '--message-error-border-color': '#f00',
    '--message-dismiss-text-color': '#fff',
    '--message-dismiss-bg-color': '#f00',
    ...theme
  } as PlaygroundTheme
}

export const GET_DARK_THEME = (theme?: PlaygroundTheme) => {
  const themeColor = theme?.['--theme-color'] || DEFAULT_THEME_COLOR
  return {
    '--editor-theme-name': 'vitesse-dark',
    '--theme-color': themeColor,
    '--border-color': '#3e4c5a',
    '--bg-color': '#22272e',
    '--toolbar-bg-color': '#262c34',
    '--toolbar-text-color': '#adbac7',
    '--toolbar-icon-bg-color': '#22272e',
    '--toolbar-icon-color': '#adbac7',
    '--toolbar-icon-active-color': themeColor,
    '--preview-bg-color': '#22272e',
    '--preview-text-color': '#fff',
    '--file-manager-bg-color': '#22272e',
    '--file-manager-text-color': '#94a3b8',
    '--file-manager-active-bg-color': '#22272e',
    '--file-manager-active-text-color': themeColor,
    '--file-manager-right-float-bg': 'linear-gradient(90deg, rgba(34, 39, 46, 0) 0%, rgba(34, 39, 46, 1) 25%)',
    '--message-warn-text-color': '#695f1b',
    '--message-warn-bg-color': '#f7f0cd',
    '--message-warn-border-color': '#695f1b',
    '--message-error-text-color': '#f00',
    '--message-error-bg-color': '#ffd7d7',
    '--message-error-border-color': '#f00',
    '--message-dismiss-text-color': '#fff',
    '--message-dismiss-bg-color': '#f00',
    ...theme
  } as PlaygroundTheme
}
