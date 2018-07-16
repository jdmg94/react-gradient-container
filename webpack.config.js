/**
* @Author: JoseMunoz
* @Date:   2018-07-16T13:06:58-06:00
* @Last modified by:   JoseMunoz
* @Last modified time: 2018-07-16T13:11:52-06:00
*/
require("babel-polyfill");
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  entry: ['babel-polyfill', path.join(__dirname, "examples/src/index.js")],
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  }
};
