import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import i18n from '@react-ssrex/i18n/client';
import { create } from 'jss';
import rtl from 'jss-rtl';
import createTheme from '@react-ssrex/ui/build/createTheme';

import AuthContainer from './layout/AuthContainer';

import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import SignoutPage from './pages/SignoutPage';
import PasswordReset from './pages/PasswordReset';
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const THEME_SETTINGS = gql`
query {
  themeSettings {
    name,
    mode,
  }
}
`;
function App() {
  const { data } = useQuery(THEME_SETTINGS);
  const [direction, setDirection] = React.useState(i18n.dir());

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
    <StylesProvider jss={jss}>
      <ThemeProvider theme={createTheme(theme.themeName, theme.themeMode, direction)}>
        <AuthContainer>
          <Switch>
            <Route path="/signup" exact>
              <SignupPage />
            </Route>
            <Route path="/signin" exact>
              <SigninPage />
            </Route>
            <Route path="/signout" exact>
              <SignoutPage />
            </Route>
            <Route path="/change-password" exact>
              <PasswordReset />
            </Route>
            <Redirect to="/signin" />
          </Switch>
        </AuthContainer>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
