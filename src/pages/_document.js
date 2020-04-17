import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

import config from '../config/environment';

function Document(props) {
  const { title, styles, children, data } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Hacker News React App" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/assets/images/hn-logo-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>{title}</title>
        {styles}
        <script
          dangerouslySetInnerHTML={{
            __html: `window['${config.reactAppId}_data'] = ${serialize(data)}`,
          }}
        />
      </head>
      <body>
        <div id={config.reactAppId}>{children}</div>
        <script src="/client.js"> </script>
      </body>
    </html>
  );
}

Document.defaultProps = {
  title: '',
  styles: null,
  children: null,
  data: {},
};

Document.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.array]),
  data: PropTypes.shape({}),
};

export default Document;
