module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react', 'prettier', 'prettier/react'],
  env: { browser: true, es6: true, node: true },
  overrides: [
    {
      files: ['test/**/*.{js,mjs}', '**/*.test.{js,mjs}'],
      env: { browser: true, es6: true, jest: true, node: true },
      rules: { 'import/first': 'off' },
    },
  ],
}
