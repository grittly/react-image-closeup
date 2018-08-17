const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
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
  mode: 'production',
  serve: {
    port: 3001,
    hotClient: false,
  },
};

