const path = require('path');
const slsw = require('serverless-webpack');
const externals = require("webpack-node-externals");

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
		minimize: false,
	},
  entry: slsw.lib.entries,
  externals: [externals()],
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
      },
    ],
  },
};
