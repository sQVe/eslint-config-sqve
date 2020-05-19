const common = {
  env: { browser: true, es6: true, node: true },
  extends: [
    'standard',
    'standard-react',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react',
  ],
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

const typescript = {
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
    ...common.rules,
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': [
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

const test = {
  env: { ...common.env, jest: true },
  files: ['test/**/*.{js,jsx,mjs,ts,tsx}', '**/*.test.{js,jsx,mjs,ts,tsx}'],
  rules: {
    ...common.rules,
    'import/first': 'off',
  },
}

module.exports = {
  ...common,
  overrides: [typescript, test],
}
