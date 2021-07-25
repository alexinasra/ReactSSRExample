/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';

import {
  InMemoryCache,
} from '@apollo/client';

import main from '@react-ssrex/ui/build/main';
import App from './App';

const graphqlUrl = `http://${window.location.hostname}:3030/webappql`;
const graphqlSubscriptionUrl = `ws://${window.location.hostname}:3030/subscriptions`;
const apolloCache = new InMemoryCache();
(async function (rootElement) {
  const renderApp = await main({
    graphqlUrl,
    graphqlSubscriptionUrl,
    apolloCache,
  });

  renderApp(App, rootElement);

  if (module.hot) {
    module.hot.accept(['./App.js'], () => {
      const NewApp = require('./App').default;
      renderApp(NewApp, rootElement);
    });
  }
}(document.getElementById('react-root')));
