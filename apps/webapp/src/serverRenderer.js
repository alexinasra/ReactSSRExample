/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import ws from 'ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import fetch from 'node-fetch';
import { I18nextProvider } from 'react-i18next';

import { getDataFromTree } from '@apollo/client/react/ssr';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';

import App, {
  cacheLtr,
  cacheRtl,
} from './App';

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    const lng = req.query.lng || req.i18n.languages[0];
    const dir = req.i18n.dir(lng);
    const httpLink = new HttpLink({
      uri: 'http://localhost:3030/webappql',
      fetchOptions: {
        credentials: 'include',
      },
      fetch,
    });

    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:3030/subscriptions',
      options: {
        reconnect: false,
      },
      webSocketImpl: ws,
    });
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition'
          && definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );

    const client = new ApolloClient({
      ssrMode: true,
      link: new HttpLink({
        link: splitLink,
      }),
      cache: new InMemoryCache(),
    });
    getDataFromTree(App).then((content) => {
      const initialState = client.extract();

      const context = {};

      const body = ReactDOMServer.renderToString(
        <I18nextProvider i18n={req.i18n}>
          <ApolloProvider client={client}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </ApolloProvider>
        </I18nextProvider>,
      );

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
          serverCss: '',
          serverBody: body,
          initialState: JSON.stringify(initialState).replace(/</g, '\\u003c'),
        });
      }
    });
  };
}
