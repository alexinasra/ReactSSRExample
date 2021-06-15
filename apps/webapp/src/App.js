import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import i18n from '@react-ssrex/i18n/client';
import { create } from 'jss';
import rtl from 'jss-rtl';
import CssBaseline from '@material-ui/core/CssBaseline';

import LayoutContainer from '@react-ssrex/ui/build/WebappLayout/LayoutContainer';
import LayoutAppBar from '@react-ssrex/ui/build/WebappLayout/LayoutAppBar';
import createTheme from '@react-ssrex/ui/build/createTheme';

import HomePage from './pages/HomePage';
import { PageNotFound } from './pages/ErrorPage';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const THEME_SETTINGS = gql`
query {
  userInRole {
    id
    themeSettings {
      name,
      mode,
    }
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
    if (data && data.userInRole) {
      return {
        themeName: data.userInRole.themeSettings.name,
        themeMode: data.userInRole.themeSettings.mode,
      };
    }
    return {
      themeName: 'default',
      themeMode: 'light',
    };
  }, [data]);
  return (
    <StylesProvider jss={jss}>
      <CssBaseline />
      <ThemeProvider theme={createTheme(theme.themeName, theme.themeMode, direction)}>
        <LayoutContainer>
          <LayoutAppBar />
          <Switch>
            <Route path="/" exact>
              <HomePage />
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
    </StylesProvider>
  );
}

export default App;
