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
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
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
          // Node built ins.
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
     * PropTypes doesn't make sense in TypeScript-land.
     * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
     */
    'react/prop-types': 'off',

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
        format: ['camelCase', 'PascalCase'],
        filter: { regex: '^_+$', match: false },
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        filter: { regex: '^_+$', match: false },
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
  extends: ['plugin:jest/recommended', 'plugin:jest/style'],
  rules: {
    ...common.rules,

    /**
     * Disable forcing imports to live at the head of the file. This is helpful
     * in cases where you want to make jest mocks for imports (improved
     * readability).
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
     */
    'import/first': 'off',

    /**
     * Enforce the use of a top level describe block for all tests.
     * https://github.com/folke/eslint-plugin-jest/blob/master/docs/rules/require-top-level-describe.md
     */
    'jest/require-top-level-describe': 'error',
  },
}

module.exports = {
  ...common,
  overrides: [typescript, test],
}
