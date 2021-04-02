import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
  },
}));

export default function SecondaryList() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} variant="outlined">
      <List component="nav" aria-label="settings">
        <ListItem button component={RouterLink} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Language Settings" />
        </ListItem>
        <ListItem button component={RouterLink} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </ListItem>
      </List>
    </Paper>
  );
}
