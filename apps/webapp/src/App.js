import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  ThemeProvider,
} from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import LayoutContainer from '@react-ssrex/ui/build/WebappLayout/LayoutContainer';
import createTheme from '@react-ssrex/ui/build/createTheme';

import HomePage from './pages/HomePage';
import CreatePoll from './pages/Poll/CreatePoll';
import ViewPoll from './pages/Poll/ViewPoll';
import { PageNotFound } from './pages/ErrorPage';

const THEME_SETTINGS = gql`
query {
  themeSettings {
    name,
    mode,
  }
}
`;

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});
const cacheLtr = createCache({
  key: 'mui',
});

function App() {
  const { i18n } = useTranslation();
  const { data } = useQuery(THEME_SETTINGS);
  const [direction, setDirection] = React.useState(i18n.dir());

  React.useEffect(() => {
    i18n.on('languageChanged', (lng) => {
      setDirection(i18n.dir(lng));
    });
  }, [i18n]);
  const theme = React.useMemo(() => {
    if (data && data.themeSettings) {
      return createTheme(data.themeSettings.name, data.themeSettings.mode, direction);
    }
    return createTheme('default', 'light', direction);
  }, [data, direction]);

  return (
    <CacheProvider value={direction.toLowerCase() === 'rtl' ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <LayoutContainer>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/poll/view-:pollId" exact>
              <ViewPoll />
            </Route>
            <Route path="/poll/create" exact>
              <CreatePoll />
            </Route>
            <Route path="/404">
              <PageNotFound />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </LayoutContainer>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
export {
  cacheLtr,
  cacheRtl,
};
