module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ].map(require.resolve),
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'import/first': 'off',
    'react/jsx-filename-extension': 'off',
    'no-param-reassign': ['error', { props: false }],
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
        requireParamType: true,
        requireReturn: true,
        requireReturnType: true,
      },
    ],
  },
};
