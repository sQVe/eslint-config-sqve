module.exports = {
  extends: ['eslint-config-airbnb', 'eslint-config-prettier'].map(
    require.resolve,
  ),
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
    'sort-imports': [
      "error", {
        "ignoreCase": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "single", "all", "multiple"]
      }
    ]
  },
};
