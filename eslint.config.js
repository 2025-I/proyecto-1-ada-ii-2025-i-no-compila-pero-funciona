import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
  {
    files: ['**/*.js'],
    ignores: ['node_modules/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 2022,
      sourceType: 'module', // Para soporte de ES Modules
    },
    plugins: {
      js,
    },
    extends: ['eslint:recommended', 'plugin:js/recommended', 'prettier'],
    rules: {
      // Reglas base de ESLint
      'no-console': 'warn',
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-underscore-dangle': 'off',

      // Reglas para Node.js/ES Modules
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'node/no-unsupported-features/es-syntax': 'off',

      // Reglas de estilo (complementan a Prettier)
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2],
      'comma-dangle': ['error', 'only-multiline'],

      // Mejores prácticas
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-var': 'error',
    },
  },
]);
