/* eslint-disable react/prop-types */
import React from 'react';
import {
  Switch, Route, Link as RouterLink, Redirect,
} from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { gql, useQuery } from '@apollo/client';

import {
  ThemeProvider,
} from '@mui/material/styles';

import { CacheProvider } from '@emotion/react';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Icon from '@mui/material/Icon';
import createTheme from '@react-ssrex/ui/build/createTheme';

import LayoutContainer from '@react-ssrex/ui/build/DashboardLayout/LayoutContainer';
import LayoutContentContainer from '@react-ssrex/ui/build/DashboardLayout/LayoutContentContainer';
import LayoutAppBar from '@react-ssrex/ui/build/DashboardLayout/LayoutAppBar';
import LayoutSideBar from '@react-ssrex/ui/build/DashboardLayout/LayoutSideBar';

import LayoutSideBarToggle from '@react-ssrex/ui/build/DashboardLayout/LayoutSideBarToggle';

import ThemeModeToggle from '@react-ssrex/ui/build/ThemeModeToggle';
import ThemePaletteSelect from '@react-ssrex/ui/build/ThemePaletteSelect';

import ForceSignin from '@react-ssrex/ui/build/ForceSignin';

import createEmotionCache from '@react-ssrex/ui/build/createEmotionCache';
import HomePage from './pages/HomePage';
import Translations from './pages/Translations';
import Users from './pages/Users';
import Polls from './pages/Polls';
import SystemNotifications from './pages/SystemNotifications';

function MainNav() {
  const { t } = useTranslation('AdminConsole', { useSuspense: false });
  return (
    <List>
      <ListItem button component={RouterLink} to="/">
        <ListItemIcon>
          <Icon>dashboard</Icon>
        </ListItemIcon>
        <ListItemText primary={t('MainNav.dashboard')} />
      </ListItem>
      <ListItem button component={RouterLink} to="/system-notifications">
        <ListItemIcon>
          <Icon>notifications</Icon>
        </ListItemIcon>
        <ListItemText primary={t('MainNav.systemNotifications')} />
      </ListItem>
      <ListItem button component={RouterLink} to="/users">
        <ListItemIcon>
          <Icon>people</Icon>
        </ListItemIcon>
        <ListItemText primary={t('MainNav.users')} />
      </ListItem>
      <ListItem button component={RouterLink} to="/polls">
        <ListItemIcon>
          <Icon>poll</Icon>
        </ListItemIcon>
        <ListItemText primary="Polls" />
      </ListItem>
      <ListItem button component={RouterLink} to="/translations/common">
        <ListItemIcon>
          <Icon>drafts</Icon>
        </ListItemIcon>
        <ListItemText primary={t('MainNav.translations')} />
      </ListItem>
    </List>
  );
}

const THEME_SETTINGS = gql`
query ThemeSettingsQuery{
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
      return {
        name: data.themeSettings.name,
        mode: data.themeSettings.mode,
      };
    }

    return {
      name: 'default',
      mode: 'light',
    };
  }, [data]);

  return (
    <CacheProvider value={createEmotionCache(direction)}>
      <ForceSignin signinUrl="/auth/signin">

        <ThemeProvider theme={createTheme(theme.name, theme.mode, direction)}>
          <LayoutContainer>
            <LayoutAppBar>
              <LayoutSideBarToggle />
              <ThemeModeToggle />
              <ThemePaletteSelect />
            </LayoutAppBar>
            <LayoutSideBar mainNav={<MainNav />} />
            <LayoutContentContainer>
              <Switch>
                <Route path="/users" exact>
                  <Users />
                </Route>
                <Route path="/system-notifications" exact>
                  <SystemNotifications />
                </Route>
                <Route path="/translations" exact>
                  <Redirect to="/translations/common" />
                </Route>
                <Route path="/translations/:namespace">
                  <Translations />
                </Route>
                <Route path="/polls" exact>
                  <Polls />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </LayoutContentContainer>
          </LayoutContainer>
        </ThemeProvider>
      </ForceSignin>
    </CacheProvider>
  );
}
