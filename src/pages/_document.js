import React from 'react';
import serialize from 'serialize-javascript';

import config from '../config/environment';

function Document(props) {
  const { title, styles, children, data } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Hacker News React App"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

export default Document;
