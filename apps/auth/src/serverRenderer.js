/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
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

const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({ uri: '/authql', fetch, credentials: 'include' }),
  cache: new InMemoryCache(),
});

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    const lng = req.query.lng || req.i18n.languages[0];
    const dir = req.i18n.dir(lng);
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

    getDataFromTree(App).then((content) => {
      const sheets = new ServerStyleSheets();
      const initialState = client.extract();
      const context = {};
      const body = ReactDOMServer.renderToString(
        sheets.collect(
          <I18nextProvider i18n={req.i18n}>
            <ApolloProvider client={client}>
              <ThemeProvider theme={createTheme('default', 'dark', dir)}>
                <StaticRouter basename="/auth" location={req.url} context={context}>
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
      //
      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.redirect(context.url);
      } else {
        res.render('auth', {
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
