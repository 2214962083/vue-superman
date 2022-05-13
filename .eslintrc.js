//@ts-check

module.exports = /** @type { import('eslint').Linter.Config } */ ({
  root: true,

  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaversion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // 'plugin:jest/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],

  // optional, if you want to lint code blocks at the same time
  settings: {
    'mdx/code-blocks': true,
    // optional, if you want to disable language mapper, set it to `false`
    // if you want to override the default language mapper inside, you can provide your own
    'mdx/language-mapper': {}
  },

  overrides: [
    {
      files: ['*.md'],
      rules: {
        'prettier/prettier': [
          2,
          {
            // unnecessary if you're not using `eslint-plugin-prettier`, but required if you are
            parser: 'markdown'
          }
        ]
      }
    },
    {
      files: ['*.md', '*.mdx'],
      extends: ['plugin:mdx/recommended', 'plugin:react/recommended'],
      settings: {
        mdx: {
          'code-blocks': true
        },
        react: {
          version: 'detect'
        }
      }
    },
    {
      files: ['**/*.md/*.js', '**/*.md/*.ts'],
      rules: {
        'no-console': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['**/*.md/**'],
      rules: {
        'prettier/prettier': 'off'
      }
    }
  ],

  rules: {
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // vue
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 10,
        multiline: 1
      }
    ],
    'vue/require-default-prop': 'off',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/no-unused-vars': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/one-component-per-file': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/comment-directive': [
      'warn',
      {
        reportUnusedDisableDirectives: false
      }
    ],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^h$'}],
    'mdx/no-unused-expressions': 'off',
    'no-undef': 'off'
  },

  globals: {
    h: true
  }
})
