const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { GenerateSW } = require('workbox-webpack-plugin');

const commonConfig = {
  // stats: 'verbose',
};

const clientConfig = {
  ...commonConfig,
  entry: './src/client/index.js',

  plugins: [new GenerateSW()],

  module: {
    rules: [{ test: /\.js/, exclude: /node_modules/, use: 'babel-loader' }],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'client.js',
  },
};

const serverConfig = {
  ...commonConfig,
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server/index.js',

  module: {
    rules: [{ test: /\.js/, use: 'babel-loader' }],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },

  node: {
    __dirname: false,
  },
};

module.exports = [clientConfig, serverConfig];
