import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  ThemeProvider,
} from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { CacheProvider } from '@emotion/react';
import LayoutContainer from '@react-ssrex/ui/build/WebappLayout/LayoutContainer';
import createTheme from '@react-ssrex/ui/build/createTheme';
import { LayoutDefaultState } from '@react-ssrex/ui/build/DashboardLayout/LayoutContext';

import createEmotionCache from '@react-ssrex/ui/build/createEmotionCache';
import HomePage from './pages/HomePage';
import CreatePoll from './pages/Poll/CreatePoll';
import ViewPoll from './pages/Poll/ViewPoll';
import { PageNotFound } from './pages/ErrorPage';

const THEME_SETTINGS = gql`
query ThemeSettingsQuery {
  themeSettings @client
}
`;
export default function App() {
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
    return createTheme(LayoutDefaultState.name, LayoutDefaultState.mode, direction);
  }, [data, direction]);

  return (
    <CacheProvider value={createEmotionCache(direction)}>
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
