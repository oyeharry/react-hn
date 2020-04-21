import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';

import routes from './routes';
import Page404 from './404';
import theme from '../styles/theme';

import Box from '../components/Box';
import Header from '../components/Header';

function App(props) {
  const { data: { props: pageProps } = {} } = props || {};

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <Box flexDirection="column" maxWidth="2" margin="0 auto">
        <Header></Header>
        <Switch>
          {routes.map(route => {
            const { path, exact, component: Component, ...rest } = route;
            return (
              <Route key={path} path={path} exact={exact}>
                <Component {...pageProps} {...props} {...rest} />
              </Route>
            );
          })}
          <Route>
            <Page404 {...pageProps} {...props} />
          </Route>
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;
