const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@common': path.resolve(__dirname, 'src/@common'),
      '@meta': path.resolve(__dirname, 'src/@meta'),
      '@pulse': path.resolve(__dirname, 'src/@pulse'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
  ],
};
