const isDefaultESLintRule = (name) => name.includes('/') === false;

// Turn ESLint rules off and use the TypeScript equivalents instead.
const useTypeScriptMirroredRule = (rules) =>
  Object.entries(rules).reduce(
    (acc, [key, val]) =>
      isDefaultESLintRule(key)
        ? { ...acc, [key]: 'off', ['@typescript-eslint/' + key]: val }
        : { ...acc, [key]: val },
    {}
  );

const commonRules = {
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
   * Disallow use of void except for statements. Void is a good way to
   * explicitly mark promises as intentionally not awaited.
   * https://eslint.org/docs/rules/no-void
   */
  'no-void': ['error', { allowAsStatement: true }],

  /**
   * Allow different jsx handler names as it produces  false positives when enabled.
   * https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
   */
  'react/jsx-handler-names': 'off',

  /**
   * Sort exports.
   * https://github.com/lydell/eslint-plugin-simple-import-sort
   */
  'simple-import-sort/exports': 'warn',

  /**
   * Sort imports.
   * https://github.com/lydell/eslint-plugin-simple-import-sort
   */
  'simple-import-sort/imports': [
    'warn',
    {
      groups: [
        // Node built-ins.
        [`^(${require('module').builtinModules.join('|')})(/|$)`],

        // React related packages come first, followed by things that start
        // with a letter (or digit or underscore), or `@` followed by a letter.
        ['^react', '^@?\\w'],

        // Packages under our scope.
        ['@sqve/'],

        // Absolute imports and relative imports.
        ['^(src|test)(/|$)', '^\\.'],
      ],
    },
  ],
};

// Mirrored rules that need some kind of handling, like using the rule from a
// different scope, before being applied.
const mirroredRules = {
  /**
   * Disallow unused variables.
   * https://eslint.org/docs/rules/no-unused-vars
   */
  'no-unused-vars': [
    'error',
    {
      args: 'none',
      ignoreRestSiblings: true,
      vars: 'all',
      varsIgnorePattern: '^_[\\w\\d_]*$',
    },
  ],
};

const common = {
  env: { browser: true, es2021: true, node: true },
  extends: [
    'standard-jsx',
    'standard-react',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['simple-import-sort'],
  rules: { ...commonRules, ...mirroredRules },
};

const javascript = {
  files: ['**/*.{js,jsx,mjs}'],
  extends: ['standard', 'prettier'],
  rules: common.rules,
};

const typescript = {
  files: ['**/*.{ts,tsx}'],
  extends: ['standard-with-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    ...useTypeScriptMirroredRule(mirroredRules), // eslint-disable-line react-hooks/rules-of-hooks

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
        leadingUnderscore: 'allow',
        filter: { regex: '^_+$', match: false },
      },
      { selector: 'typeLike', format: ['PascalCase'] },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        filter: { regex: '^_+$', match: false },
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        filter: { regex: '^_+$', match: false },
      },
      { selector: 'enumMember', format: ['PascalCase'] },
    ],

    /**
     * Prefer nullish coalesing except on conditional tests.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
     */
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      { ignoreConditionalTests: true, ignoreMixedLogicalExpressions: false },
    ],

    /**
     * Enforce strict boolean expressions except for null or undefined.
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
     */
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: true,
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNullableNumber: true,
        allowAny: false,
      },
    ],
  },
};

const test = {
  env: { ...common.env, jest: true },
  files: [
    '**/*.{spec,test}.{js,jsx,mjs,ts,tsx}',
    '**/jest.setup.{js,mjs,ts}',
    'test/**/*.{js,jsx,mjs,ts,tsx}',
  ],
  extends: ['plugin:jest/recommended', 'plugin:jest/style'],
  rules: {
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
};

module.exports = {
  ...common,
  overrides: [javascript, typescript, test],
};
