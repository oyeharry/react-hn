import path from 'path';
import _ from 'lodash';

var rootPath = path.normalize(path.join(__dirname, '/..'));
var env = process.env;

// All configurations will extend these options
// ============================================
var all = {
  reactAppId: '__hacker_news_app',

  env: env.NODE_ENV,

  ip: '0.0.0.0',

  //Root path of the server
  root: rootPath,

  imagesPath: '/src/static/assets/images',

  port: process.env.PORT || 9000,
};

// Export the config object based on the NODE_ENV
// ==============================================
export default _.merge(all, require(`./${env.NODE_ENV}.js`).default || {});
