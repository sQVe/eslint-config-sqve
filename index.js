const isDefaultESLintRule = (name) => name.includes('/') === false

/** Turn ESLint rules off and use the TypeScript equivalents instead. */
const createTypescriptRulesFromESLintRules = (rules) =>
  Object.entries(rules).reduce(
    (acc, [key, val]) =>
      isDefaultESLintRule(key)
        ? { ...acc, [key]: 'off', ['@typescript-eslint/' + key]: val }
        : { ...acc, [key]: val },
    {}
  )

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
     * Temporarily disable JSX handler name check as it currently reports false
     * positives for inline functions. This should be reverted once
     * https://github.com/yannickcr/eslint-plugin-react/pull/2761 is fixed.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
     */
    'react/jsx-handler-names': 'off',

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
    'standard-with-typescript',
    'standard-react',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react',
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
    ...createTypescriptRulesFromESLintRules(common.rules),

    /**
     * Enforce using `type` for object type definitions.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
     */
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

    /**
     * Disable force of explicit function return type. This allows TypeScript
     * to figure out the type itself, which can be helpful in many cases.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
}

const test = {
  env: { ...common.env, jest: true },
  files: [
    '**/*.{spec,test}.{js,jsx,mjs,ts,tsx}',
    '**/jest.setup.{js,mjs,ts}',
    'test/**/*.{js,jsx,mjs,ts,tsx}',
  ],
  rules: {
    ...common.rules,
    'import/first': 'off',
  },
}

module.exports = {
  ...common,
  overrides: [typescript, test],
}
