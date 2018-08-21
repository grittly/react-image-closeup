const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'demo/src/index.jsx'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-image-closeup demo',
      template: path.join(__dirname, 'demo/src/template.ejs'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  serve: {
    port: 3000,
    hotClient: false,
  },
};

