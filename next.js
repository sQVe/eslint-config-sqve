module.exports = {
  extends: ['plugin:@next/next/core-web-vitals'],
  rules: {
    /**
     * Disable enforcing valid anchor.
     * https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
     */
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
