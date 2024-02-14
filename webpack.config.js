const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
    publicPath: '/',
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
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@domain': path.resolve(__dirname, 'src/domain'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@main': path.resolve(__dirname, 'src/main'),
      '@presentation': path.resolve(__dirname, 'src/presentation'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
  ],
  bail: false,
  devServer: {
    historyApiFallback: true,
  },
};
