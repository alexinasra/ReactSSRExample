import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Icon from '@mui/material/Icon';

export default function MainNav() {
  const { t, ready } = useTranslation('UserConsole', { useSuspense: false });
  if (!ready) return false;
  return (
    <List>
      <ListItem button component={Link} to="/profile">
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
      <ListItem button component={Link} to="/settings">
        <ListItemIcon>
          <Icon fontSize="large">
            settings
          </Icon>
        </ListItemIcon>
        <ListItemText primary={t('mainNav.systemSettings')} />
      </ListItem>
    </List>
  );
}
