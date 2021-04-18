/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDom from 'react-dom';
import {
  ApolloProvider, ApolloClient, InMemoryCache, GraphQLUpload,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

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
import createTheme from '@react-ssrex/ui/build/createTheme';
import App from './App';
import LayoutContext from './layout/LayoutContext';
import layoutReducer, * as actions from './layout/LayoutReducer';
import layoutDefaultState from './layout/LayoutDefaultState';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const client = new ApolloClient({
  link: createUploadLink({
    uri: '/userconsoleql',
  }),
  cache: new InMemoryCache({ Upload: GraphQLUpload }).restore(window.__APOLLO_STATE__),
  ssrForceFetchDelay: 100,
});

function renderApp(RenderedApp) {
  function Main() {
    const [direction, setDirection] = React.useState(i18n.dir());

    const [state, dispatch] = React.useReducer(layoutReducer, layoutDefaultState);
    React.useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    }, []);
    React.useEffect(() => {
      i18n.on('languageChanged', (lng) => {
        setDirection(i18n.dir(lng));
      });
    }, [i18n]);
    return (
      <LayoutContext.Provider value={{
        state: { ...state },
        expandSidebar: () => dispatch(actions.expandSidebarAction()),
        shrinkSidebar: () => dispatch(actions.shrinkSidebarAction()),
        setDarkMode: () => dispatch(actions.setDarkMode()),
        setLightMode: () => dispatch(actions.setLightMode()),
        toggleThemeMode: () => dispatch(actions.toggleThemeMode()),
      }}
      >
        <ThemeProvider theme={createTheme('default', state.themeMode, direction)}>
          <RenderedApp />
        </ThemeProvider>
      </LayoutContext.Provider>
    );
  }
  const rootElm = document.getElementById('react-root');
  if (rootElm) {
    ReactDom.hydrate(
      <ApolloProvider client={client}>
        <BrowserRouter basename="/userconsole">
          <StylesProvider jss={jss}>
            <Main />
          </StylesProvider>
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
    renderApp(App, createTheme);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.dir(err);
    ReactDom.render(<p>Error</p>, document.getElementById('react-root'));
  });
