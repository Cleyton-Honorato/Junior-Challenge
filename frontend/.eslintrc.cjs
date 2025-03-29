module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['import', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Módulos nativos do Node.js (fs, path, etc.)
          'external', // Bibliotecas externas (react, axios, etc.)
          'internal', // Imports internos do projeto
          ['parent', 'sibling', 'index'], // Imports relativos
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
  },
};
