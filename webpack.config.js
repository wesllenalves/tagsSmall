require('dotenv').config();
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'tags-small.min.js',
    libraryTarget: 'umd',
    library: 'TagsSmall',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: [path.join(__dirname, 'example'), path.join(__dirname, 'lib')],
  },
};
