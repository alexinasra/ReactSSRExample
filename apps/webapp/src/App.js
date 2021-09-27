import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@mui/styles';
import i18n from '@react-ssrex/i18n/client';
import { create } from 'jss';
import rtl from 'jss-rtl';

import LayoutContainer from '@react-ssrex/ui/build/WebappLayout/LayoutContainer';
import createTheme from '@react-ssrex/ui/build/createTheme';

import HomePage from './pages/HomePage';
import { PageNotFound } from './pages/ErrorPage';

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
      return createTheme(data.themeSettings.name, data.themeSettings.mode, direction);
    }
    return createTheme(undefined, undefined, direction);
  }, [data, direction]);
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <LayoutContainer>
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
