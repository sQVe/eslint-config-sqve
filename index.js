const isDefaultESLintRule = (name) => name.includes('/') === false

// Turn ESLint rules off and use the TypeScript equivalents instead.
const useTypescriptRuleVariant = (rules) =>
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
    'standard-jsx',
    'standard-react',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['simple-import-sort'],
  rules: {
    /**
     * Allow callback literals.
     * https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-callback-literal.md
     */
    'node/no-callback-literal': 'off',

    /**
     * Disallow newline after imports.
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
     */
    'import/newline-after-import': 'error',

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
     * Sort exports.
     * https://github.com/lydell/eslint-plugin-simple-import-sort
     */

    'simple-import-sort/exports': 'error',

    /**
     * Sort imports.
     * https://github.com/lydell/eslint-plugin-simple-import-sort
     */
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [`^(${require('module').builtinModules.join('|')})(/|$)`],
          // Packages. `react` related packages come first.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^react', '^@?\\w'],
          // Absolute imports and Relative imports.
          ['^(src|test)(/|$)', '^\\.'],
        ],
      },
    ],
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
    ...useTypescriptRuleVariant(common.rules), // eslint-disable-line react-hooks/rules-of-hooks

    /**
     * Disable force of explicit function return type. This allows TypeScript
     * to figure out the type itself, which can be helpful in many cases.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    '@typescript-eslint/explicit-function-return-type': 'off',

    /**
     * Enforce naming conventions.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
     */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        leadingUnderscore: 'allow',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'variable',
        leadingUnderscore: 'allow',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      { selector: 'typeLike', format: ['PascalCase'] },
    ],
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
