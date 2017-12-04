const path = require('path');

const aliasrc = require('./.aliasrc');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    worker: true,
    serviceworker: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  plugins: [
    'import',
  ],
  rules: {
    // webpack エイリアスで警告を出さない
    'import/no-extraneous-dependencies': [
      'off', {
        packageDir: Object.keys(aliasrc.resolve.alias),
      },
    ],
    // eslint-plugin-vue 4.x に vue/script-indent ルールが追加されるまでの次善策
    // @see https://github.com/eslint/eslint/issues/8778
    indent: 'off',
    'indent-legacy': ['error', 2, { SwitchCase: 1 }],
    // インライン無効化が正常動作するまでの次善策
    // @see https://github.com/eslint/eslint/issues/8778
    'max-len': ['warn'],
  },
  settings: {
    // webpack のエイリアスを認識させる
    // @see https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers/webpack
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, '.aliasrc.js'),
      },
    },
  },
  globals: {},
};
