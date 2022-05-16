import * as Babel from '@babel/standalone'
import AutoImport from './babel-auto-import'

Babel.registerPlugin('auto-import', AutoImport)

export function babelTransformTsJsx(src: string, filename?: string) {
  return Babel.transform(src || 'export default {};', {
    sourceType: 'module',
    filename: filename || 'index.tsx',
    presets: [
      [
        'react',
        {
          pragma: 'h',
          pragmaFrag: 'Fragment'
        }
      ],
      [
        'typescript',
        {
          isTsx: true,
          jsxPragma: 'preserve',
          jsxPragmaFrag: 'Fragment'
        }
      ]
    ],
    plugins: [
      'proposal-export-namespace-from',
      'proposal-export-default-from',
      'proposal-optional-chaining',
      [
        'proposal-decorators',
        {
          legacy: true
        }
      ],
      [
        'proposal-class-properties',
        {
          loose: true
        }
      ],
      [
        'auto-import',
        {
          declarations: [{members: ['h'], path: 'vue'}]
        }
      ]
    ]
  }).code
}
