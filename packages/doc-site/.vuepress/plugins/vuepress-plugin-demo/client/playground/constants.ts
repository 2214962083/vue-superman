import {MaybeRef} from '@vueuse/core'
import {InjectionKey} from 'vue'
import {Store} from '../core'

export const FILE_BASE_URL = 'file:///root/'
export const FILE_NAME_PREFIX = 'mona-file-'
export const DEFAULT_FILE_NAME = 'comp.vue'
export const IMPORT_JSON_NAME = 'import-map.json'
export const STORE_INJECT_KEY = '__store__' as unknown as InjectionKey<Store>
export const CLEAR_CONSOLE_INJECT_KEY = '__clear_console__' as unknown as InjectionKey<MaybeRef<boolean>>
export const SHOW_IMPORT_MAP_INJECT_KEY = '__show_import_map__' as unknown as InjectionKey<MaybeRef<boolean>>
