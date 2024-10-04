import typescriptEslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

const languageOptions = {
  globals: {
    ...globals.node,
    ...globals.jest,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
  parser: tsParser,
};

const plugins = {
  import: importPlugin,
  'import/parsers': tsParser,
  react,
  prettier,
};

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: [
      'node_modules/**/*',
      'build/**/*',
      'dist/**/*',
      'server/**/*',
      'src/__generated__/**/*',
    ],
  },
  {
    plugins,
  },
  {
    languageOptions: {
      ...languageOptions,
    },
  },
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    rules: {
      'prettier/prettier': ['error'],
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-no-constructed-context-values': 'off',

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],

      'import/named': 'off',
      'import/namespace': 0,
      'import/default': 2,
      'import/export': 2,
      'linebreak-style': 0,
      'class-methods-use-this': 0,
      'eslint-disable-next-line react/jsx-no-useless-fragment': 'off',
      'no-underscore-dangle': 'off',
      'no-useless-constructor': 0,
      'max-classes-per-file': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      camelcase: 'off',
    },
  },
];
