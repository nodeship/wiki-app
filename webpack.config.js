const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const Dotenv = require('dotenv-webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = (env) =>({
  mode: env.mode,
  entry: {
    app:'./src/index.ts',
    styles: './src/styles.css'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: env.mode === 'production' ? '[name]-[hash].bundle.js' : '[name].bundle.js'
  },
  stats: { children: false },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: env.mode === 'development'
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  devServer: {
    hot: true,
    writeToDisk: true,
    port: 9000,
    contentBase: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WikiApp',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    }),
    new CheckerPlugin()
 ]

});
