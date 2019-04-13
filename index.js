const rules = {
  'valid-jsdoc': [
    'error',
    {
      prefer: {
        arg: 'param',
        argument: 'param',
        constructor: 'class',
        return: 'returns',
      },
      preferType: {
        Boolean: 'boolean',
        Number: 'number',
        Object: 'object',
        String: 'string',
      },
      requireParamDescription: false,
      requireReturnDescription: false,
      requireParamType: true,
      requireReturn: true,
      requireReturnType: true,
    },
  ],
}

module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react', 'prettier', 'prettier/react'],
  env: { browser: true, es6: true, node: true },
  rules,
  overrides: [
    {
      files: ['test/**/*.{js,mjs}', '**/*.test.{js,mjs}'],
      env: { browser: true, es6: true, jest: true, node: true },
      rules: { 'import/first': 'off' },
    },
  ],
}
