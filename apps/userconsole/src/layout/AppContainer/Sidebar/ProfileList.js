import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Icon from '@material-ui/core/Icon';

export default function ProfileList() {
  return (
    <Box>
      <List component="nav" aria-label="profile">
        <ListItem button component={RouterLink} to="/profile">
          <ListItemIcon>
            <Icon>
              account_circle
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem button component="a" href="/auth/change-password?redirectto=/userconsole">
          <ListItemIcon>
            <Icon>
              lock_open
            </Icon>
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
      </List>
    </Box>
  );
}
