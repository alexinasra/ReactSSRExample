/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import fetch from 'node-fetch';

import {
  ServerStyleSheets,
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from '@material-ui/core/styles';

import { create } from 'jss';
import rtl from 'jss-rtl';
import createTheme from '@react-ssrex/ui/build/createTheme';
import App from './App';

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    const lng = req.i18n.languages[0];
    const dir = req.i18n.dir(lng);
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: '/userconsoleql',
        fetch,
        credentials: 'include',
        headers: {
          cookie: req.header('Cookie'),
        },
      }),
      cache: new InMemoryCache(),
    });

    getDataFromTree(App).then((content) => {
      const initialState = client.extract();
      const sheets = new ServerStyleSheets();
      const context = {};
      const body = ReactDOMServer.renderToString(
        sheets.collect(
          <I18nextProvider i18n={req.i18n}>
            <ApolloProvider client={client}>
              <ThemeProvider theme={createTheme('default', 'light', dir)}>
                <StaticRouter basename="/userconsole" context={context} location={req.url}>
                  <StylesProvider jss={jss}>
                    <App />
                  </StylesProvider>
                </StaticRouter>
              </ThemeProvider>
            </ApolloProvider>
          </I18nextProvider>,
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
        res.render('userconsole', {
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
