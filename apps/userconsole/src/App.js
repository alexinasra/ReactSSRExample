/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import i18n from '@react-ssrex/i18n/client';
import { create } from 'jss';
import rtl from 'jss-rtl';

import { gql, useQuery, useMutation } from '@apollo/client';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';
import createTheme from '@react-ssrex/ui/build/createTheme';
import LayoutContainer from '@react-ssrex/ui/build/LayoutContainer';

import LayoutContext, { LayoutDefaultState } from '@react-ssrex/ui/build/LayoutContext';
import SideBarReducer, * as actions from '@react-ssrex/ui/build/SideBarReducer';
import ForceLogin from './ForceLogin';

import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

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
const SET_THEME_NAME = gql`
  mutation ($themeName: String!) {
    setThemeName(themeName: $themeName) {
      id
      themeSettings {
        name
        mode
      }
    }
  }
`;
const TGL_THEME_MODE = gql`
  mutation{
    toggleThemeMode {
      id
      themeSettings {
        name
        mode
      }
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(THEME_SETTINGS);
  const [setThemeName] = useMutation(SET_THEME_NAME);
  const [toggleThemeMode] = useMutation(TGL_THEME_MODE);
  const [direction, setDirection] = React.useState(i18n.dir());
  const [state, dispatch] = React.useReducer(SideBarReducer, {
    ...LayoutDefaultState,
  });

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
      ...LayoutDefaultState,
    };
  }, [data]);

  if (loading) {
    return (<div> loading </div>);
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }

  return (
    <ForceLogin>
      <LayoutContext.Provider value={{
        state: { ...state, ...theme },
        expandSidebar: () => dispatch(actions.expandSidebarAction()),
        shrinkSidebar: () => dispatch(actions.shrinkSidebarAction()),
        setThemeName,
        toggleThemeMode,
      }}
      >
        <StylesProvider jss={jss}>
          <ThemeProvider theme={createTheme(theme.themeName, theme.themeMode, direction)}>
            <LayoutContainer>
              <Switch>
                <Route path="/profile" exact>
                  <Profile />
                </Route>
                <Route path="/settings" exact>
                  <Settings />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </LayoutContainer>
          </ThemeProvider>
        </StylesProvider>
      </LayoutContext.Provider>
    </ForceLogin>
  );
}
