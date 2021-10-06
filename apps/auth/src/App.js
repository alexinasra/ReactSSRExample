import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import {
  ThemeProvider,
} from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { useTranslation } from 'react-i18next';
import createTheme from '@react-ssrex/ui/build/createTheme';
import AuthReport from '@react-ssrex/ui/build/AuthReport';

import AuthContainer from './layout/AuthContainer';

import Home from './pages/Home';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import GuestSigninPage from './pages/GuestSigninPage';
import SignoutPage from './pages/SignoutPage';
import PasswordReset from './pages/PasswordReset';

const THEME_SETTINGS = gql`
query {
  themeSettings @client
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
      return {
        themeName: data.themeSettings.name,
        themeMode: data.themeSettings.mode,
      };
    }
    return {
      themeName: 'default',
      themeMode: 'light',
    };
  }, [data]);
  return (
    <CacheProvider value={direction === 'rtl' ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={createTheme(theme.themeName, theme.themeMode, direction)}>
        <AuthReport>
          {({ userInRole }) => (
            <AuthContainer>
              <Switch>
                <Route path="/signup" exact>
                  {userInRole ? <Redirect to="/" /> : <SignupPage />}
                </Route>
                <Route path="/signin" exact>
                  {userInRole ? <Redirect to="/" /> : <SigninPage />}
                </Route>
                <Route path="/guest-signin" exact>
                  <GuestSigninPage />
                </Route>
                <Route path="/signout" exact>
                  <SignoutPage />
                </Route>
                <Route path="/change-password" exact>
                  <PasswordReset />
                </Route>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Redirect to="/signin" />
              </Switch>
            </AuthContainer>
          )}
        </AuthReport>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
