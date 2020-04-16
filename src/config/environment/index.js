import path from 'path';

const rootPath = path.normalize(path.join(__dirname, '/..'));
const env = process.env;
let config;

// All configurations will extend these options
// ============================================
const all = {
  reactAppId: '__hacker_news_app',

  env: env.NODE_ENV,

  ip: '0.0.0.0',

  //Root path of the server
  root: rootPath,

  imagesPath: '/src/static/assets/images',

  port: process.env.PORT || 9000,
};

if (env.NODE_ENV === 'production') {
  config = { ...all, ...require(`./${env.NODE_ENV}.js`) };
} else {
  config = { ...all, ...require(`./${env.NODE_ENV}.js`).default };
}

// Export the config object based on the NODE_ENV
// ==============================================
export default config;
