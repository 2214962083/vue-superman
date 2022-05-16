/* eslint-disable @typescript-eslint/no-explicit-any */
import * as base64Js from 'js-base64'

export function debounce(fn: Function, n = 100) {
  let handle: any
  return (...args: any[]) => {
    if (handle) clearTimeout(handle)
    handle = setTimeout(() => {
      fn(...args)
    }, n)
  }
}

// prefer old unicode hacks for backward compatibility
// https://base64.guru/developers/javascript/examples/unicode-strings
export function utoa(data: string): string {
  return base64Js.encode(encodeURIComponent(data))
}

export function atou(base64: string): string {
  return decodeURIComponent(base64Js.decode(base64))
}

export function getPkgUrl(name: string, version = 'latest', ending = '') {
  return `https://cdn.jsdelivr.net/npm/${name}@${version}${ending}`
}
