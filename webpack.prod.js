const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'demo/src/index.jsx'),
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'demo', 'dist')]),
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
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo', 'dist'),
  },
  mode: 'production',
};

