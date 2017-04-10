module.exports = () => ({
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['ie >= 9']
    },
    'cssnano': {
      autoprefixer: false
    }
  }
})
