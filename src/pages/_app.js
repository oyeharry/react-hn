import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';
import Page404 from './404';

function App(props) {
  const { data: { props: pageProps } = {} } = props || {};

  return (
    <Switch>
      {routes.map((route) => {
        const { path, exact, component: Component, ...rest } = route;
        return (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => (
              <Component {...pageProps} {...props} {...rest} />
            )}
          />
        );
      })}
      <Route render={(props) => <Page404 {...pageProps} {...props} />} />
    </Switch>
  );
}

export default App;
