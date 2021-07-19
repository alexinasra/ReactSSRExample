/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';

import {
  ApolloProvider, ApolloClient, GraphQLUpload, InMemoryCache, split, concat, HttpLink, ApolloLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { createUploadLink } from 'apollo-upload-client';

import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { BrowserRouter } from 'react-router-dom';
import i18n, { setupI18n } from '@react-ssrex/i18n/client';
import App from './App';

const httpLink = createUploadLink({
  uri: 'http://localhost:3030/userconsoleql',
});
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
    },
  }));

  return forward(operation);
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3030/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
    },
  },
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
  concat(authMiddleware, httpLink),
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({ Upload: GraphQLUpload }).restore(window.__APOLLO_STATE__),
  ssrMode: true,
  ssrForceFetchDelay: 100,
});

function renderApp(RenderedApp) {
  const rootElm = document.getElementById('react-root');
  if (rootElm) {
    ReactDom.hydrate(
      <ApolloProvider client={client}>
        <BrowserRouter basename="/userconsole">
          <RenderedApp />
        </BrowserRouter>
      </ApolloProvider>,
      rootElm,
    );
  }
}

if (module.hot) {
  module.hot.accept(['./App.js'], () => {
    const NewApp = require('./App').default;
    renderApp(NewApp);
  });
}
const opts = {
  useDetection: true,
  languageDetector: LanguageDetector,
  detectionOptions: {
    // order and from where user language should be detected
    order: ['htmlTag', 'querystring', 'cookie', 'localStorage'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'localhost',

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,

    // only detect languages that are in the whitelist
    // checkWhitelist: true
  },
};

setupI18n(opts, LanguageDetector, initReactI18next)
  .then(() => {
    renderApp(App);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.dir(err);
    ReactDom.render(<p>Error</p>, document.getElementById('react-root'));
  });
