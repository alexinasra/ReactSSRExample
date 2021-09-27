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
  split, HttpLink,
  ApolloProvider,
} from '@apollo/client';
import ws from 'ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { getDataFromTree } from '@apollo/client/react/ssr';

import fetch from 'node-fetch';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';

export default function serverRenderer({ clientStats, serverStats }) {
  return (req, res, next) => {
    const lng = req.query.lng || req.i18n.languages[0];
    const dir = req.i18n.dir(lng);
    const httpLink = new HttpLink({
      uri: 'http://localhost:3030/authql',
    });

    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:3030/subscriptions',
      options: {
        reconnect: true,
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
      link: createHttpLink({
        link: splitLink,
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
      const cache = createCache({ key: 'css' });
      const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

      const context = {};
      const body = ReactDOMServer.renderToString(
        <CacheProvider value={cache}>
          <I18nextProvider i18n={req.i18n}>
            <ApolloProvider client={client}>
              <StaticRouter basename="/auth" location={req.url} context={context}>
                <App />
              </StaticRouter>
            </ApolloProvider>
          </I18nextProvider>
        </CacheProvider>,
      );
      // Grab the CSS from emotion
      const emotionChunks = extractCriticalToChunks(body);
      const emotionCss = constructStyleTagsFromChunks(emotionChunks);

      //
      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.redirect(context.url);
      } else {
        res.render('auth', {
          lng,
          dir,
          serverCss: emotionCss,
          serverBody: body,
          initialState: JSON.stringify(initialState).replace(/</g, '\\u003c'),
        });
      }
    });
  };
}
