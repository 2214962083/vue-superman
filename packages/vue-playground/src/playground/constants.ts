import {MaybeRef} from '@vueuse/core'
import {InjectionKey} from 'vue'
import {Store} from '../core'
import {PlaygroundTheme} from './utils/types-helper'

export const PLAYGROUND_COMPONENT_NAME = 'Playground' as const
export const FILE_BASE_URL = 'file:///root/' as const
export const PROJECT_ID_PREFIX = 'project' as const
export const DEFAULT_FILE_NAME = 'comp.vue' as const
export const IMPORT_JSON_NAME = 'import-map.json' as const
export const STORE_INJECT_KEY = '__store__' as unknown as InjectionKey<Store>
export const CLEAR_CONSOLE_INJECT_KEY = '__clear_console__' as unknown as InjectionKey<MaybeRef<boolean>>
export const SHOW_IMPORT_MAP_INJECT_KEY = '__show_import_map__' as unknown as InjectionKey<MaybeRef<boolean>>
export const THEME_INJECT_KEY = '__theme__' as unknown as InjectionKey<MaybeRef<PlaygroundTheme>>
