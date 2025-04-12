import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: ['node_modules/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
      prettier,
    },
    rules: {
      // Import plugin rules
      'import/extensions': ['error', 'always', { ignorePackages: true }],

      // Base ESLint rules
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-underscore-dangle': 'off',
      'node/no-unsupported-features/es-syntax': 'off',

      // Style rules
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2],
      'comma-dangle': ['error', 'only-multiline'],

      // Best practices
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-var': 'error',

      // Prettier
      'prettier/prettier': 'error',
    },
  },
]);
