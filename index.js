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
    /**
     * Disallow empty functions.
     * https://eslint.org/docs/rules/no-empty-function
     */
    'no-empty-function': 'error',

    /**
     * Disallow variable declarations from shadowing variables declared in the
     * outer scope.
     * https://eslint.org/docs/rules/no-shadow
     */
    'no-shadow': [
      'error',
      {
        allow: [
          '_',
          '__',
          '___',
          '____',
          '_____',
          '______',
          '_______',
          '________',
          '_________',
          '__________',
        ],
      },
    ],

    /**
     * Disallow unused variables.
     * https://eslint.org/docs/rules/no-empty-function
     */
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_+$',
      },
    ],

    /**
     * Allow omitting prop types, mainly due to the rule being buggy and
     * reporting many false positives. Furthermore, this would be obsolete once
     * we move over to TypeScript.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
     */
    'react/prop-types': 'off',

    /**
     * Disable `no-callback-literal` rule, mainly due to it being too
     * restrictive and reporting false positives. It is also largely unused as
     * it is prefered to use async/await instead.
     * https://github.com/standard/eslint-plugin-standard
     */
    'standard/no-callback-literal': 'off',
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
