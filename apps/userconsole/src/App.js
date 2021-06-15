/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import i18n from '@react-ssrex/i18n/client';
import { create } from 'jss';
import rtl from 'jss-rtl';

import { gql, useQuery } from '@apollo/client';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset,
} from '@material-ui/core/styles';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '@material-ui/core/Icon';
import createTheme from '@react-ssrex/ui/build/createTheme';
import LayoutContainer from '@react-ssrex/ui/build/DashboardLayout/LayoutContainer';
import LayoutContentContainer from '@react-ssrex/ui/build/DashboardLayout/LayoutContentContainer';
import LayoutAppBar from '@react-ssrex/ui/build/DashboardLayout/LayoutAppBar';
import LayoutSideBar from '@react-ssrex/ui/build/DashboardLayout/LayoutSideBar';

import LayoutContext, { LayoutDefaultState } from '@react-ssrex/ui/build/DashboardLayout/LayoutContext';
import SideBarReducer, * as actions from '@react-ssrex/ui/build/DashboardLayout/SideBarReducer';
import ForceSignin from '@react-ssrex/ui/build/ForceSignin';
import AppLoading from '@react-ssrex/ui/build/AppLoading';

import LayoutSideBarToggle from '@react-ssrex/ui/build/DashboardLayout/LayoutSideBarToggle';

import ThemeModeToggle from '@react-ssrex/ui/build/ThemeModeToggle';
import ThemePaletteSelect from '@react-ssrex/ui/build/ThemePaletteSelect';

import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const MainNav = () => {
  const { t, ready } = useTranslation('UserConsole', { useSuspense: false });
  if (!ready) return false;
  return (
    <List>
      <ListItem button component={RouterLink} to="/profile">
        <ListItemIcon>
          <Icon fontSize="large">
            account_circle
          </Icon>
        </ListItemIcon>
        <ListItemText primary={t('mainNav.editProfile')} />
      </ListItem>
      <ListItem button component="a" href="/auth/change-password?redirectto=/userconsole">
        <ListItemIcon>
          <Icon fontSize="large">
            lock_open
          </Icon>
        </ListItemIcon>
        <ListItemText primary={t('mainNav.changePassword')} />
      </ListItem>
      <ListItem button component={RouterLink} to="/settings">
        <ListItemIcon>
          <Icon fontSize="large">
            settings
          </Icon>
        </ListItemIcon>
        <ListItemText primary={t('mainNav.systemSettings')} />
      </ListItem>
    </List>
  );
};
const THEME_SETTINGS = gql`
query {
  themeSettings {
    name,
    mode,
  }
}
`;
export default function App() {
  const { data, loading, error } = useQuery(THEME_SETTINGS);
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

  if (loading) {
    return (<AppLoading />);
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }

  return (
    <ForceSignin signinUrl="/auth/signin">
      <LayoutContext.Provider value={{
        state,
        expandSidebar: () => dispatch(actions.expandSidebarAction()),
        shrinkSidebar: () => dispatch(actions.shrinkSidebarAction()),
      }}
      >
        <StylesProvider jss={jss}>
          <ThemeProvider theme={createTheme(theme.themeName, theme.themeMode, direction)}>
            <LayoutContainer>
              <LayoutAppBar>
                <LayoutSideBarToggle />
                <ThemeModeToggle />
                <ThemePaletteSelect />
              </LayoutAppBar>
              {' '}
              <LayoutSideBar mainNav={<MainNav />} />
              <LayoutContentContainer>
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
              </LayoutContentContainer>
            </LayoutContainer>
          </ThemeProvider>
        </StylesProvider>
      </LayoutContext.Provider>
    </ForceSignin>
  );
}
