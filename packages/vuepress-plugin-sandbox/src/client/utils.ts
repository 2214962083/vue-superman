import {LoadSandbox} from './types-helper'

export const configLoadSandbox = (loadSandbox: LoadSandbox, _window: Window = self) => {
  _window.loadSandbox = loadSandbox
}
