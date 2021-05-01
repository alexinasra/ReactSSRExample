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
} from '@material-ui/core/styles';

import App from './App';

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    const lng = req.i18n.language;
    const dir = req.i18n.dir(lng);
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: '/adminconsoleql',
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
              <StaticRouter basename="/admin" context={context} location={req.url}>
                <App />
              </StaticRouter>
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
        res.render('adminconsole', {
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
