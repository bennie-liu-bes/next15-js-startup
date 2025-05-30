import globals from 'globals'
import pluginJs from '@eslint/js'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import tailwind from 'eslint-plugin-tailwindcss'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  {
    plugins: {
      'unused-imports': unusedImports,
      perfectionist,
      'jsx-a11y': jsxA11y,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      camelcase: [1, { properties: 'always' }],
      'no-alert': 0,
      'no-console': 0,
      'no-unused-vars': 0,
      'no-nested-ternary': 0,
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'no-use-before-define': 0,
      'no-restricted-exports': 0,
      'no-promise-executor-return': 0,
      // React
      'react/prop-types': 0,
      'react/jsx-pascal-case': [1, { allowAllCaps: true, ignore: [] }],
      'react/no-children-prop': 0,
      'react/react-in-jsx-scope': 0,
      'react/no-array-index-key': 0,
      'react/require-default-props': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
      'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
      'react/function-component-definition': 0,
      'react/no-unstable-nested-components': [1, { allowAsProps: true }],
      // import
      'import/named': 0,
      'import/default': 0,
      'import/no-duplicates': 0,
      'import/no-unresolved': 0,
      'import/no-nodejs-modules': 0,
      'import/no-dynamic-require': 0,
      'unused-imports/no-unused-imports': 1,
      'unused-imports/no-unused-vars': [
        1,
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/control-has-associated-label': 0,
      'perfectionist/sort-named-imports': [1, { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-imports': [
        1,
        {
          type: 'line-length',
          order: 'asc',
          ignoreCase: true,
          specialCharacters: 'keep',
          internalPattern: ['~/**'],
          sortSideEffects: true,
          newlinesBetween: 'always',
          maxLineLength: undefined,
          groups: [
            'style',
            'type',
            ['builtin', 'external'],
            'custom-shadcn',
            'custom-mui',
            'custom-routes',
            'custom-hooks',
            'custom-hooks2',
            'custom-utils',
            'internal',
            'custom-components',
            'custom-sections',
            'custom-auth',
            'custom-types',
            ['parent', 'sibling', 'index'],
            ['parent-type', 'sibling-type', 'index-type'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              ['custom-shadcn']: '@/components/**',
              ['custom-mui']: '@mui/**',
              ['custom-auth']: 'src/app/auth/**',
              ['custom-hooks']: 'src/app/hooks/**',
              ['custom-hooks2']: '@/hooks/**',
              ['custom-utils']: 'src/app/utils/**',
              ['custom-types']: 'src/app/types/**',
              ['custom-routes']: 'src/app/routes/**',
              ['custom-sections']: 'src/app/sections/**',
              ['custom-components']: 'src/app/components/**',
            },
          },
        },
      ],
    },
  },
  ...tailwind.configs['flat/recommended'],
  prettier,
]
