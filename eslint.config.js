import cypressPlugin from 'eslint-plugin-cypress'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.cy.js'],
    plugins: {
      cypress: cypressPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...cypressPlugin.configs.recommended.languageOptions.globals,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
      ...prettierConfig.rules,
    },
  },
]
