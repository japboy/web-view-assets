const ResolverFactory = require('enhanced-resolve/lib/ResolverFactory');
const NodeJsInputFileSystem = require('enhanced-resolve/lib/NodeJsInputFileSystem');
const CachedInputFileSystem = require('enhanced-resolve/lib/CachedInputFileSystem');

const aliasrc = require('./.aliasrc');

const CACHED_DURATION = 60000;
const fileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), CACHED_DURATION);

/**
 * CSS パス解決関数 (エイリアス定義のために必要)
 */
function createResolver(alias) {
  const resolver = ResolverFactory.createResolver({
    alias,
    extensions: ['.css'],
    modules: [
      'node_modules',
    ],
    useSyncFileSystemCalls: true,
    fileSystem,
  });
  return resolver;
}

/**
 * ベンダープレフィクス対応 UA
 * @see https://github.com/ai/browserslist#browserslist
 */
const browserslist = [
  'Android >= 4',
  'Chrome >= 50',
  'ChromeAndroid >= 50',
  'Edge >= 12',
  'Explorer >= 9',
  'ExplorerMobile >= 9',
  'Firefox >= 40',
  'FirefoxAndroid >= 40',
  'iOS >= 7',
  'Safari >= 6',
];

/**
 * CSS 圧縮時の設定
 * @see http://cssnano.co/guides/optimisations/
 */
const cssnano = {
  autoprefixer: false, // cssnext とコンフリクトするので false
  normalizeUrl: false, // Akamai Image Converter 系の絶対パス URL で問題が出るので false
  svgo: false,
  // @see https://github.com/ben-eb/postcss-discard-unused#fontface
  discardUnused: {
    fontFace: false, // ikyu.css の @font-face がストリップされるので無効化
  },
  // カルーセル vue コンポーネントで z-index を最適化されると表示が乱れるので無効化
  // @see https://github.com/ben-eb/gulp-cssnano/issues/14
  zindex: false,
};

module.exports = (ctx) => {
  const resolver = createResolver(aliasrc.resolve.alias);

  const config = {
    // @see https://github.com/postcss/postcss/blob/master/docs/source-maps.md#postcss-and-source-maps
    map: false,

    plugins: {
      'postcss-import': {
        // @see https://github.com/postcss/postcss-import#resolve
        // @see https://github.com/postcss/postcss-import/issues/190#issuecomment-298078092
        resolve(id, basedir) {
          return resolver.resolveSync({}, basedir, id);
        },
      },

      'postcss-url': {},

      'postcss-cssnext': {
        browsers: browserslist,
      },
    },
  };

  // 本番ビルド以外は source map 有効
  if (ctx.env !== 'production') {
    config.map = {
      inline: false,
    };
  }

  // 開発ビルド以外は minify 有効
  if (['production', 'staging', 'staging2'].includes(ctx.env)) {
    config.plugins.cssnano = cssnano;
  }

  return config;
};
