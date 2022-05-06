export type OutputModes = 'preview' | 'js' | 'css' | 'ssr'

export type Module = any

declare global {
  interface Window {
    process: {
      env: {}
    }
    __modules__?: Record<string, Module>
    __export__?: (module: Module, exportKey: string, getFn: () => any) => void
    __dynamic_import__?: <T = Module>(moduleName: string) => Promise<T>
    __next__?: () => void
  }
}
