module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: '../../',
  },
  extends: [
    './index.js',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint'],
}
