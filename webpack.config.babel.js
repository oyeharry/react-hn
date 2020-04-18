import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { GenerateSW } from 'workbox-webpack-plugin';
import regexparam from 'regexparam';
import pageRoutes from './src/pages/routes';

const commonConfig = {
  // stats: 'verbose',
};

const pageRoutesRuntimeCaching = pageRoutes
  .filter(({ cache }) => cache)
  .map(({ path: routePath }) => {
    const { pattern: pagePathRegExp } = regexparam(routePath);

    return {
      urlPattern: eval(`({url}) => {
        return ${pagePathRegExp}.exec(url.pathname);
      }`),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'page-route-cache',
      },
    };
  });

const generateSWConfig = {
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    ...pageRoutesRuntimeCaching,
    {
      urlPattern: /https:\/\/hn\.algolia\.com\/api/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'algolia-api-cache',
        expiration: {
          maxEntries: 30,
        },
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
};

const clientConfig = {
  ...commonConfig,
  entry: './src/client/index.js',

  plugins: [],

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

export default (env, { mode }) => {
  if (mode === 'production') {
    clientConfig.plugins.push(new GenerateSW(generateSWConfig));
  }
  return [clientConfig, serverConfig];
};
