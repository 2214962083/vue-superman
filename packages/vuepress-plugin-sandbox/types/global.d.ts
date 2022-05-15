import type {LoadSandbox} from '../src/client/types-helper'

declare global {
  interface Window {
    loadSandbox?: LoadSandbox
  }
}
