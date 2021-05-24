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
npm install --save-dev eslint eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react prettier
```

To use `typescript` we need to install the optional dependencies:📦

```sh
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript eslint-plugin-standard
```
