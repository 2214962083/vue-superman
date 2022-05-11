import type {LoadSandbox} from '../src/types-helper'

declare global {
  interface Window {
    loadSandbox?: LoadSandbox
  }
}
