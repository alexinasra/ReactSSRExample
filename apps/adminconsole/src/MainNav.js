import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Icon from '@mui/material/Icon';

export default function MainNav() {
  const { t } = useTranslation('AdminConsole', { useSuspense: false });
  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <Icon>dashboard</Icon>
        </ListItemIcon>
        <ListItemText primary={t('MainNav.dashboard')} />
      </ListItem>
      <ListItem button component={Link} to="/system-notifications">
        <ListItemIcon>
          <Icon>notifications</Icon>
        </ListItemIcon>
        <ListItemText primary={t('MainNav.systemNotifications')} />
      </ListItem>
      <ListItem button component={Link} to="/users">
        <ListItemIcon>
          <Icon>people</Icon>
        </ListItemIcon>
        <ListItemText primary={t('MainNav.users')} />
      </ListItem>
      <ListItem button component={Link} to="/polls">
        <ListItemIcon>
          <Icon>poll</Icon>
        </ListItemIcon>
        <ListItemText primary="Polls" />
      </ListItem>
      <ListItem button component={Link} to="/translations/common">
        <ListItemIcon>
          <Icon>drafts</Icon>
        </ListItemIcon>
        <ListItemText primary={t('MainNav.translations')} />
      </ListItem>
    </List>
  );
}
