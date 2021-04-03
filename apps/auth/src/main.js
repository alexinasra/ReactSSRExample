/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';
import {
  ApolloProvider, ApolloClient, HttpLink, InMemoryCache,
} from '@apollo/client';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import i18n, { setupI18n } from '@react-ssrex/i18n/client';
import theme from './theme';
import App from './App';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const client = new ApolloClient({
  link: new HttpLink({ uri: '/authql', credentials: 'include' }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  ssrForceFetchDelay: 100,
});

function renderApp(RenderedApp, renderedTheme) {
  function Main() {
    React.useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    }, []);

    return (
      <ThemeProvider theme={{ ...renderedTheme, direction: document.dir }}>
        <StylesProvider jss={jss}>
          <RenderedApp />
        </StylesProvider>
      </ThemeProvider>
    );
  }
  const rootElm = document.getElementById('react-root');
  if (rootElm) {
    ReactDom.hydrate(
      <ApolloProvider client={client}>
        <BrowserRouter basename="/auth">
          <Main />
        </BrowserRouter>
      </ApolloProvider>,
      rootElm,
    );
  }
}

if (module.hot) {
  module.hot.accept(['./App.js', './theme.js'], () => {
    const NewApp = require('./App').default;
    const NewTheme = require('./theme').default;
    renderApp(NewApp, NewTheme);
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
    renderApp(App, theme);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.dir(err);
    ReactDom.render(<p>Error</p>, document.getElementById('react-root'));
  });
