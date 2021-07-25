/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';

import {
  InMemoryCache,
} from '@apollo/client';

import main from '@react-ssrex/ui/build/main';
import App from './App';

const graphqlUrl = `http://${window.location.hostname}:3030/adminconsoleql`;
const graphqlSubscriptionUrl = `ws://${window.location.hostname}:3030/subscriptions`;
const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        i18nTranslationKeys: {
          keyArgs: ['id', 'namespace'],
          merge: (existing, incoming) => incoming,
        },
      },
    },
  },
});
(async function (rootElement) {
  const renderApp = await main({
    graphqlUrl,
    graphqlSubscriptionUrl,
    apolloCache,
    basename: '/adminconsole',
  });

  renderApp(App, rootElement);

  if (module.hot) {
    module.hot.accept(['./App.js'], () => {
      const NewApp = require('./App').default;
      renderApp(NewApp, rootElement);
    });
  }
}(document.getElementById('react-root')));
