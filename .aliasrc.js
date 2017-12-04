/**
 * パス解決エイリアス再定義スクリプト
 *
 * Nuxt.js で定義されている ~/assets などのパス解決を PostCSS や ESLint の定義にも反映させたいので、
 * エイリアスを再定義するファイル。Nuxt.js の元定義を参照したかったが、方法がよく分かないので。
 */

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
  },
};
