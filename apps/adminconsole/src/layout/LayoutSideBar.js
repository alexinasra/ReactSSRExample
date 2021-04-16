import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LayoutContext from './LayoutContext';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export default function LayoutSideBar() {
  const classes = useStyles();

  return (
    <LayoutContext.Consumer>
      {({ state, shrinkSidebar }) => (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.root, !state.expandedSidebar && classes.drawerPaperClose),
          }}
          open={state.expandedSidebar}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={shrinkSidebar}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={RouterLink} to="/locale-settings">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItem>
            <ListItem button component={RouterLink} to="/vehicles">
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Vehicles" />
            </ListItem>
            <ListItem button component={RouterLink} to="/locale-settings/languages">
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Language Settings" />
            </ListItem>
            <ListItem button component={RouterLink} to="/locale-settings/translations">
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Translations" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </LayoutContext.Consumer>
  );
}
