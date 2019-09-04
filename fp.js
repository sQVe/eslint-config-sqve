const testSettings = {
  files: ['test/**/*.{js,mjs,ts}', '**/*.test.{js,mjs,ts}'],
  env: { browser: true, es6: true, jest: true, node: true },
  rules: {
    'fp/no-arguments': 'off',
    'fp/no-class': 'off',
    'fp/no-delete': 'off',
    'fp/no-events': 'off',
    'fp/no-get-set': 'off',
    'fp/no-let': 'off',
    'fp/no-loops': 'off',
    'fp/no-mutating-assign': 'off',
    'fp/no-mutating-methods': 'off',
    'fp/no-mutation': 'off',
    'fp/no-nil': 'off',
    'fp/no-proxy': 'off',
    'fp/no-this': 'off',
    'fp/no-throw': 'off',
    'fp/no-unused-expression': 'off',
    'fp/no-valueof-field': 'off',
    'import/first': 'off',
  },
}

module.exports = {
  extends: ['./index.js', 'plugin:fp/recommended'],
  plugins: ['fp'],
  rules: {
    'fp/no-mutation': [
      'error',
      {
        commonjs: true,
        exceptions: [{ property: 'propTypes' }, { property: 'defaultProps' }],
      },
    ],
    'fp/no-rest-parameters': 'off',
    'fp/no-unused-expression': ['off'],
  },
  overrides: [testSettings],
}
