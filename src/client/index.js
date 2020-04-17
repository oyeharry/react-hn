import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import config from '../config/environment';
import App from '../pages/_app';
import serviceWorker from './serviceWorker';

hydrate(
  <BrowserRouter>
    <App data={window[`${config.reactAppId}_data`]} />
  </BrowserRouter>,
  document.getElementById(config.reactAppId)
);

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
