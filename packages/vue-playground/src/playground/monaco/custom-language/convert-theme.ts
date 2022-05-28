import {Writeable} from '@/playground/utils/types-helper'
import type {IRawTheme, IRawThemeSetting} from 'vscode-textmate'

export interface TextmateTheme {
  name: string
  include: string
  tokenColors: TokenColor[]
  settings: TokenColor[]
  colors: Colors
}

interface TokenColor {
  name?: string
  scope: string[] | string
  settings: Settings
}

interface Settings {
  foreground?: string
  background?: string
  fontStyle?: string
}

type Colors = {
  'editor.background': string
  'editor.foreground': string
} & Record<string, string>

export function convertTheme(theme: TextmateTheme): Writeable<IRawTheme> {
  const result: Writeable<IRawTheme> = {
    name: '',
    settings: []
  }

  if (theme.name && !result.name) {
    result.name = theme.name
  }

  // parse config
  if (Array.isArray(theme.settings)) {
    convertSettings(theme.settings, result)
    return result
  }

  const tokenColors = theme.tokenColors
  if (tokenColors) {
    if (Array.isArray(tokenColors)) {
      result.settings.push(...tokenColors)
      // eslint-disable-next-line no-empty
    } else if (typeof tokenColors === 'string') {
    } else {
      throw new Error('other error type of tokenColors')
    }
  }
  defaultTokenColor(theme, result)
  return result
}

function convertSettings(oldSettings: Writeable<IRawThemeSetting>[], result: {settings: IRawThemeSetting[]}): void {
  for (const rule of oldSettings) {
    result.settings.push(rule)
    if (!rule.scope) {
      const settings = rule.settings
      if (!settings) {
        rule.settings = {}
      }
    }
  }
}

function defaultTokenColor(theme: TextmateTheme, result: IRawTheme): void {
  if (theme.colors) {
    const rule: Writeable<IRawThemeSetting> = {settings: {}}
    if (theme.colors['editor.background']) {
      ;(rule.settings as Writeable<typeof rule.settings>).background = theme.colors['editor.background']
    }
    if (theme.colors['editor.foreground']) {
      ;(rule.settings as Writeable<typeof rule.settings>).foreground = theme.colors['editor.foreground']
    }
    if (Object.keys(rule.settings).length) {
      result.settings.push(rule)
    }
  }
}
