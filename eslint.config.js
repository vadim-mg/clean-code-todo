import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended', eslintConfigPrettier],
    languageOptions: {
      globals: globals.browser, // глобальные переменные браузера (window, document и т.д.)
    },
    rules: {
      'no-var': 'error', // запрет var, требуем let/const
      'prefer-const': 'error', // требуем const там, где переменная не переприсваивается
      'no-console': 'warn', // console.log — предупреждение (не ломает сборку)
    },
  },
  {
    files: ['**/*.js'],
    ignores: ['eslint.config.js'], // чтобы не ломать парсинг самого конфига
    languageOptions: { sourceType: 'script' },
  },
]);
