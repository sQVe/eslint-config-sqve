# eslint-config-sqve

This package currently provides two ESLint configs. The general config which is based of `eslint-config-standard` with `eslint-config-prettier` to exclude rules handled by prettier. See `index.js` for further information about additions and modifications.

The specialized functional programming (`fp`) config utilizes `eslint-plugin-fp` with it's recommended rules plus some style related additions. See `fp.js` for further information about additions and modifications.

# Install

First install the package itself:

```sh
npm install --save-dev eslint-config-sqve
```

When the package is installed we need to ensure that all its' peer dependencies are installed by running:

```sh
npx install-peerdeps --dev eslint-config-sqve
```

The `fp` config needs the optional dependency `eslint-plugin-fp` to be installed:

```sh
npm install --save-dev eslint-plugin-fp
```
