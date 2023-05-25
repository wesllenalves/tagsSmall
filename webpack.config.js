require('dotenv').config();
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'tags-small.min.js',
    libraryTarget: 'umd',
    library: 'TagsSmall',
  },
};
