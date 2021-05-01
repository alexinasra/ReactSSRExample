/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';

import i18n from '@react-ssrex/i18n/client';
import { create } from 'jss';
import rtl from 'jss-rtl';

import { gql, useQuery, useMutation } from '@apollo/client';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import createTheme from '@react-ssrex/ui/build/createTheme';
import LayoutContainer from '@react-ssrex/ui/build/LayoutContainer';
import LayoutContentContainer from '@react-ssrex/ui/build/LayoutContentContainer';
import LayoutAppBar from '@react-ssrex/ui/build/LayoutAppBar';
import LayoutSideBar from '@react-ssrex/ui/build/LayoutSideBar';

import LayoutContext, { LayoutDefaultState } from '@react-ssrex/ui/build/LayoutContext';
import SideBarReducer, * as actions from '@react-ssrex/ui/build/SideBarReducer';
import ForceLogin from '@react-ssrex/ui/build/ForceLogin';

import HomePage from './pages/HomePage';
import { TranslationsPage } from './pages/LanguageLocalePage';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const MainNav = () => (
  <List>
    <ListItem button component={RouterLink} to="/locale-settings">
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItem>
    <ListItem button component={RouterLink} to="/locale-settings/translations">
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Translations" />
    </ListItem>
  </List>
);
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
              <LayoutAppBar />
              <LayoutSideBar mainNav={<MainNav />} />
              <LayoutContentContainer>
                <Switch>
                  <Route path="/locale-settings/translations" exact>
                    <TranslationsPage />
                  </Route>
                  <Route path="/">
                    <HomePage />
                  </Route>
                </Switch>
              </LayoutContentContainer>
            </LayoutContainer>
          </ThemeProvider>
        </StylesProvider>
      </LayoutContext.Provider>
    </ForceLogin>
  );
}
