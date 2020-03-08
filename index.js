const defaultSettings = {
  env: { browser: true, es6: true, node: true },
  extends: ['standard', 'standard-react', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  rules: {
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_+$',
      },
    ],
  },
}

const typescriptSettings = {
  files: ['**/*.{ts,tsx}'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    ...defaultSettings.rules,
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'semi', requireLast: true },
        singleline: { delimiter: 'semi', requireLast: false },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
}

const testSettings = {
  env: { ...defaultSettings.env, jest: true },
  files: ['test/**/*.{js,jsx,mjs}', '**/*.test.{js,jsx,mjs}'],
  rules: { ...defaultSettings.rules, 'import/first': 'off' },
}

module.exports = {
  ...defaultSettings,
  overrides: [typescriptSettings, testSettings],
}
