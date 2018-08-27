module.exports = ctx => ({
  map: ctx.options.map,
  plugins: {
    'postcss-modules': {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      // Don't need postcss to output a json file as babel
      // plugin takes care of css file nameing already
      getJSON: () => {},
    },
    autoprefixer: ctx.env === 'production' ? {} : false,
    cssnano: ctx.env === 'production' ? {} : false,
  },
});
