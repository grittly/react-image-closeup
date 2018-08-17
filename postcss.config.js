module.exports = ctx => ({
  map: ctx.options.map,
  plugins: {
    'postcss-modules': {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});
