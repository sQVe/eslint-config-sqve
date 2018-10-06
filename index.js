module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ].map(require.resolve),
  parser: 'babel-eslint',
  plugins: ['eslint-plugin-prettier'].map(require.resolve),
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/first': 'off',
    'react/jsx-filename-extension': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};
