/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import {
  ServerStyleSheets,
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from '@material-ui/core/styles';

import { create } from 'jss';
import rtl from 'jss-rtl';
import theme from './theme';
import App from './App';

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    const client = new ApolloClient({
      ssrMode: true,
      link: new HttpLink({
        uri: '/webappql',
        fetch,
        credentials: 'include',
        headers: {
          cookie: req.header('Cookie'),
        },
      }),
      cache: new InMemoryCache(),
    });
    const lng = req.query.lng || req.i18n.languages[0];
    const dir = req.i18n.dir(lng);
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

    getDataFromTree(App).then((content) => {
      const initialState = client.extract();

      const sheets = new ServerStyleSheets();
      const context = {};
      theme.direction = dir;
      const body = ReactDOMServer.renderToString(
        sheets.collect(
          <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <StylesProvider jss={jss}>
                <StaticRouter context={context} location={req.url}>
                  <App />
                </StaticRouter>
              </StylesProvider>
            </ThemeProvider>
          </ApolloProvider>,

        ),
      );

      const css = sheets.toString();

      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url,
        });
        res.end();
      } else {
        res.render('webapp', {
          lng,
          dir,
          serverCss: css,
          serverBody: body,
          initialState: JSON.stringify(initialState).replace(/</g, '\\u003c'),
        });
      }
    });
  };
}
