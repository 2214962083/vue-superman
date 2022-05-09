/* eslint-disable @typescript-eslint/no-explicit-any */
// ReplProxy and srcdoc implementation from Svelte REPL
// MIT License https://github.com/sveltejs/svelte-repl/blob/master/LICENSE

export interface PreviewProxyHandler {
  onFetchProgress?: (e: any) => void
  onError?: (err: any) => void
  onUnhandledRejection?: (err: any) => void
  onConsole?: (e: any) => void
  onConsoleGroup?: (e: any) => void
  onConsoleGroupCollapsed?: (e: any) => void
  onConsoleGroupEnd?: (e: any) => void
}

export type PreviewProxyAction =
  | 'cmd_error'
  | 'cmd_ok'
  | 'fetch_progress'
  | 'error'
  | 'unhandledrejection'
  | 'console'
  | 'console_group'
  | 'console_group_collapsed'
  | 'console_group_end'

export type IframeAction = 'eval' | 'catch_clicks'

export type PreviewProxyMessageData = {
  action: PreviewProxyAction
  cmd_id: number
  args: {
    remaining?: any
  }
  message?: Error['message']
  stack?: Error['stack']
}
export type PreviewProxyMessageEvent = MessageEvent<PreviewProxyMessageData>

interface PreviewProxyOptions {
  iframe: HTMLIFrameElement
  handler?: PreviewProxyHandler
}

export class PreviewProxy {
  static uid = 1

  iframe: HTMLIFrameElement
  handlers?: PreviewProxyHandler
  pendingActions: Map<number, {resolve: (value: unknown) => void; reject: (reason?: any) => void}>
  removeMessageListen?: () => void

  constructor(options: PreviewProxyOptions) {
    this.iframe = options.iframe
    this.handlers = options.handler

    this.pendingActions = new Map()

    const fn = (e: PreviewProxyMessageEvent) => this.handleReplMessage(e)
    window.addEventListener('message', fn, false)
    this.removeMessageListen = () => window.removeEventListener('message', fn)
  }

  destroy() {
    this.removeMessageListen?.()
  }

  dispatchIframeAction(action: IframeAction, args: any) {
    return new Promise((resolve, reject) => {
      const cmd_id = PreviewProxy.uid++

      this.pendingActions.set(cmd_id, {resolve, reject})

      this.iframe.contentWindow!.postMessage({action, cmd_id, args}, '*')
    })
  }

  handleActionMessage(data: PreviewProxyMessageData) {
    const {cmd_id: id, action} = data
    const handler = this.pendingActions.get(id)

    if (handler) {
      this.pendingActions.delete(id)
      if (action === 'cmd_error') {
        const {message, stack} = data
        const e = new Error(message)
        e.stack = stack
        handler.reject(e)
      }

      if (action === 'cmd_ok') {
        handler.resolve(data.args)
      }
    } else {
      console.error('action not found', id, data, [...this.pendingActions.keys()])
    }
  }

  handleReplMessage(event: PreviewProxyMessageEvent) {
    if (event.source !== this.iframe.contentWindow) return

    const {action, args} = event.data

    switch (action) {
      case 'cmd_error':
      case 'cmd_ok':
        return this.handleActionMessage(event.data)
      case 'fetch_progress':
        return this.handlers?.onFetchProgress?.(args.remaining)
      case 'error':
        return this.handlers?.onError?.(event.data)
      case 'unhandledrejection':
        return this.handlers?.onUnhandledRejection?.(event.data)
      case 'console':
        return this.handlers?.onConsole?.(event.data)
      case 'console_group':
        return this.handlers?.onConsoleGroup?.(event.data)
      case 'console_group_collapsed':
        return this.handlers?.onConsoleGroupCollapsed?.(event.data)
      case 'console_group_end':
        return this.handlers?.onConsoleGroupEnd?.(event.data)
    }
  }

  eval(script: string | string[]) {
    return this.dispatchIframeAction('eval', {script})
  }

  catchClicks() {
    return this.dispatchIframeAction('catch_clicks', {})
  }
}
