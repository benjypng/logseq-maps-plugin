import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.recommended,
  reactYouMightNotNeedAnEffect.configs.recommended,
  prettierConfig,
  {
    ignores: ['**/dist/', '**/leaflet/'],
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_' },
      ],
      'react-you-might-not-need-an-effect/no-pass-data-to-parent': 'off',
    },
  },
]
