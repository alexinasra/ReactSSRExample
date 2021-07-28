import React from 'react';
import ReactDom from 'react-dom';

import {
  gql, ApolloProvider, ApolloClient, InMemoryCache, split, concat, HttpLink, ApolloLink,
} from '@apollo/client';

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client'

import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { BrowserRouter } from 'react-router-dom';

import i18n, { setupI18n } from '@react-ssrex/i18n/client';


export default async function main({
  graphqlUrl,
  graphqlSubscriptionUrl,
  apolloCache,
  basename,
}) {

  const httpLink = new createUploadLink({
    uri: graphqlUrl,
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
    uri: graphqlSubscriptionUrl,
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
  const cache = apolloCache || new InMemoryCache();
  const client = new ApolloClient({
    link: splitLink,
    cache: cache.restore(window.__APOLLO_STATE__),
    ssrForceFetchDelay: 100,
  });

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
  if (!localStorage.getItem('token')) {
    const GUEST_SIGNIN_M = gql`
    mutation {
      guestSignin {
        token
      }
    }
    `;

    const { data } = await client.mutate({
      mutation: GUEST_SIGNIN_M
    });

    localStorage.setItem('token', data.guestSignin.token);
  }
  await setupI18n(opts, LanguageDetector, initReactI18next);

  return function (RenderedApp, rootElement) {
    if (rootElement) {
      ReactDom.hydrate(
        <ApolloProvider client={client}>
          <BrowserRouter basename={basename}>
            <RenderedApp />
          </BrowserRouter>
        </ApolloProvider>,
        rootElement,
      );
    }
  }
}
