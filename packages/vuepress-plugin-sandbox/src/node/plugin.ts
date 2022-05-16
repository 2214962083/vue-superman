/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import {Plugin} from '@vuepress/core'
import markdownItContainer from 'markdown-it-container'
import type {MarkdownEnv} from '@vuepress/markdown'
import type * as Token from 'markdown-it/lib/token'
import type * as Renderer from 'markdown-it/lib/renderer'
import {File, PlaygroundLifeCycle, PlaygroundOptions, PlaygroundThemes, ImportMap} from 'vue-playground'
import * as base64 from 'js-base64'

const pathResolve = (..._path: string[]) => path.resolve(__dirname, ..._path)

export type MarkdownItRenderFn = (
  tokens: Token[],
  index: number,
  options: any,
  env: MarkdownEnv,
  self: Renderer
) => string

export interface SandboxOptions {
  demoCodeMark?: string
  defaultDescription?: string
  importMap?: ImportMap
  themes?: PlaygroundThemes
}

export type RenderPlaceFunction = (description: string, codeBlockTokens?: Token[]) => string

export const sandboxPlugin = (options: SandboxOptions = {}): Plugin => {
  const {demoCodeMark = 'demo', defaultDescription = '', themes, importMap} = options

  const START_TYPE = `container_${demoCodeMark}_open`
  const END_TYPE = `container_${demoCodeMark}_close`
  const CODE_BLOCK_TYPE = 'fence'
  const START_NESTING = 1
  const END_NESTING = -1

  const renderBefore: RenderPlaceFunction = (des, codeBlockTokens) => {
    const files: File[] = []
    if (codeBlockTokens && codeBlockTokens.length) {
      codeBlockTokens.map(token => {
        const [lang, filename] = token.info.split(/\s+/)
        const codeContent = token.content
        const _filename = filename.endsWith(`.${lang}`) ? filename : `${filename}.${lang}`
        const file = new File(_filename, codeContent)
        files.push(file)
      })
    }

    console.log('files....', files)

    const options: PlaygroundOptions = {files, themes, importMap}
    const optionsBase64 = base64.encode(JSON.stringify(options))

    return `<div class="demo-container ${demoCodeMark}">${
      des ? `<p class="demo-container-title">${des}</p>` : ''
    }<playground v-bind="JSON.parse(base64.decode('${optionsBase64}'))">\n`
  }

  const renderAfter: RenderPlaceFunction = () => '</playground></div>\n'

  const descriptionsStack: string[] = []
  const render: MarkdownItRenderFn = (tokens, index, opts, env) => {
    const token = tokens[index]
    if (token.nesting === START_NESTING) {
      // `before` tag

      // resolve description (title)
      const description = token.info.trim().slice(demoCodeMark.length).trim() || defaultDescription
      descriptionsStack.push(description)

      let i = index + 1
      const codeBlockTokens: Token[] = []
      while (tokens[i].type !== END_TYPE) {
        const nextToken = tokens[i]
        if (nextToken.type === CODE_BLOCK_TYPE) {
          codeBlockTokens.push(nextToken)
        }
        i++
      }

      return renderBefore(description, codeBlockTokens)
    } else {
      // `after` tag

      // pop the description from stack
      const description = descriptionsStack.pop() || ''

      // render
      return renderAfter(description)
    }
  }

  const plugin: Plugin = {
    name: 'vuepress-plugin-sandbox',
    clientAppEnhanceFiles: [pathResolve('./enhanceAppFile.mjs').replace(/\\/g, '/')],
    extendsMarkdown: md => {
      md.use(markdownItContainer, demoCodeMark, {render})
    }
  }

  return plugin
}
