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
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from './createEmotionCache';

export default function serverRender(basename, templatename, App) {
  return (req, res, next) => {
    const lng = req.i18n.language;
    const dir = req.i18n.dir(lng);
    const httpLink = new HttpLink({
      uri: 'http://localhost:3030/graphql',
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
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              themeSettings: {
                read() {
                  return {
                    name: req.cookies.themeName || 'default',
                    mode: req.cookies.themeMode || 'light',
                  };
                },
              },
            },
          },
        },
      })
    });
    const cache = createEmotionCache(dir);
    const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

    getDataFromTree(App).then((content) => {
      const initialState = client.extract();

      const context = {};
      const body = ReactDOMServer.renderToString(
        <I18nextProvider i18n={req.i18n}>
          <ApolloProvider client={client}>
            <StaticRouter basename={basename} context={context} location={req.url}>
              <App />
            </StaticRouter>
          </ApolloProvider>
        </I18nextProvider>,
      );

      // Grab the CSS from emotion
      const emotionChunks = extractCriticalToChunks(body);
      const emotionCss = constructStyleTagsFromChunks(emotionChunks);

      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url,
        });
        res.end();
      } else {
        res.render(templatename, {
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
