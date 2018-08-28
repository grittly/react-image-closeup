module.exports = ctx => ({
  map: ctx.options.map,
  plugins: {
    'postcss-modules': {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      getJSON: () => {},
    },
    autoprefixer: ctx.env === 'production' ? {} : false,
    cssnano: ctx.env === 'production' ? {} : false,
  },
});
