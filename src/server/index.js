import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';

import config from '../config/environment';
import configExpress from '../config/express';
import routes from '../pages/routes';
import Document from '../pages/_document';
import App from '../pages/_app';

const app = express();
configExpress(app);

function getStaticResponseString(path, data) {
  const sheet = new ServerStyleSheet();
  let app = (
    <StaticRouter location={path} context={{}}>
      <App data={data} />
    </StaticRouter>
  );
  let styles;

  try {
    renderToString(sheet.collectStyles(app));
    styles = sheet.getStyleElement();
  } catch (error) {
    console.error(error);
  }

  const html = `<!DOCTYPE html> ${renderToString(
    <Document title="Hacker News" data={data} styles={styles}>
      {app}
    </Document>
  )}`;
  sheet.seal();
  return html;
}

routes.map((route) => {
  app.get(route.path, (req, res) => {
    const { path } = req;

    if (route && typeof route.component.getServerSideProps === 'function') {
      route.component.getServerSideProps(req).then((data) => {
        res.status(200).send(getStaticResponseString(path, data));
      });
    } else {
      res.status(200).send(getStaticResponseString(path));
    }
  });
});

app.listen(config.port, config.ip, () => {
  console.log(`Server is running on port ${config.port}`);
});
