const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { GenerateSW } = require('workbox-webpack-plugin');

const commonConfig = {
  // stats: 'verbose',
};

const clientConfig = {
  ...commonConfig,
  entry: './src/client/index.js',

  plugins: [
    new GenerateSW({
      // swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\//,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'index-page-cache',
          },
        },
        {
          urlPattern: /\.(?:png|gif|jpg|jpeg|svg|ico|json)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets-cache',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 1 * 24 * 60 * 60, // 1 Day
            },
          },
        },
      ],
    }),
  ],

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
