const testSettings = {
  env: { ...defaultSettings.env, jest: true },
  files: ['test/**/*.{js,jsx,mjs,ts,tsx}', '**/*.test.{js,jsx,mjs,ts,tsx}'],
  rules: { 'import/first': 'off' },
}

const typescriptSettings = {
  files: ['**/*.{ts,tsx}'],
  extends: [
    './index.js',
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
  env: { browser: true, es6: true, node: true },
  extends: ['standard', 'standard-react', 'prettier', 'prettier/react'],
  overrides: [testSettings, typescriptSettings],
  parser: 'babel-eslint',
}
