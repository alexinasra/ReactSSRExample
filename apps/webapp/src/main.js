/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';

import main from '@react-ssrex/ui/build/main';
import App from './App';

const graphqlUrl = `http://${window.location.hostname}:3030/graphql`;
const graphqlSubscriptionUrl = `ws://${window.location.hostname}:3030/subscriptions`;

(async function (rootElement) {
  const renderApp = await main({
    graphqlUrl,
    graphqlSubscriptionUrl,
  });

  renderApp(App, rootElement);

  if (module.hot) {
    module.hot.accept(['./App.js'], () => {
      const NewApp = require('./App').default;
      renderApp(NewApp, rootElement);
    });
  }
}(document.getElementById('react-root')));
