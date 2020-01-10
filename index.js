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

const testSettings = {
  env: { ...defaultSettings.env, jest: true },
  files: ['test/**/*.{js,jsx,mjs,ts,tsx}', '**/*.test.{js,jsx,mjs,ts,tsx}'],
  rules: { ...defaultSettings.rules, 'import/first': 'off' },
}

const typescriptSettings = {
  files: ['**/*.{ts,tsx}'],
  extends: [
    'plugin:@typescript-eslint/recommended',
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
        multiline: { delimiter: 'comma', requireLast: true },
        singleline: { delimiter: 'comma', requireLast: false },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
}

module.exports = {
  ...defaultSettings,
  overrides: [testSettings, typescriptSettings],
}
