/**
 * Express configuration
 */

import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import enforce from 'express-sslify';

import config from './environment';

export default function (app) {
  var env = app.get('env');

  app.use(compression());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  app.use(
    favicon(
      path.join(config.root, 'src', 'static', 'assets', 'images', 'favicon.ico')
    )
  );

  if (env === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
    app.use(express.static(path.join(config.root, 'build')));
    app.use(express.static(path.join(config.root, 'src', 'static')));
  }

  if (env === 'development') {
    app.use(express.static(path.join(config.root, 'build')));
    app.use(express.static(path.join(config.root, 'src', 'static')));
    app.use(errorHandler()); /* Error handler - has to be last */
  }
}
