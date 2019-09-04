const testSettings = {
  files: ['test/**/*.{js,mjs,ts}', '**/*.test.{js,mjs,ts}'],
  env: { browser: true, es6: true, jest: true, node: true },
  rules: { 'import/first': 'off' },
}

module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react', 'prettier', 'prettier/react'],
  env: { browser: true, es6: true, node: true },
  overrides: [testSettings],
}
