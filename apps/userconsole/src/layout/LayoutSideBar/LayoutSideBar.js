import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '@material-ui/core/Icon';

import LayoutContext from '../LayoutContext';
import UserProfile from './UserProfile';

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
  logoUrl: {
    flexGrow: 1,
    align: 'center',
    height: theme.mixins.toolbar.minHeight,
  },
  logoImg: {
    width: '100%',
  },
  menuButton: {
    background: theme.palette.secondary.light,
  },
  menuButtonHidden: {
    display: 'none',
  },
}));

export default function LayoutSideBar() {
  const classes = useStyles();
  const [localExpand, setLocalExpand] = React.useState(false);
  const handleLocalExpand = () => setLocalExpand(true);
  const handleLocalShrink = () => setLocalExpand(false);

  return (
    <LayoutContext.Consumer>
      {({ state: { expandedSidebar }, shrinkSidebar }) => (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.root, !expandedSidebar && !localExpand && classes.drawerPaperClose),
          }}
          open={expandedSidebar || localExpand}
        >
          <div className={classes.toolbarIcon}>
            <RouterLink className={classes.logoLink} to="/">
              <img className={classes.logoImg} src="/assets/logo.png" alt="lookfor.ae" />
            </RouterLink>
            <IconButton
              className={clsx(
                classes.menuButton, !expandedSidebar && classes.menuButtonHidden,
              )}
              onClick={shrinkSidebar}
            >
              <Icon>menu</Icon>
            </IconButton>
          </div>
          <Divider />
          <UserProfile />
          <Divider />
          <Box onMouseOver={handleLocalExpand} onMouseLeave={handleLocalShrink}>
            <List>
              <ListItem button component={RouterLink} to="/profile">
                <ListItemIcon>
                  <Icon fontSize="large">
                    account_circle
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItem>
              <ListItem button component="a" href="/auth/change-password?redirectto=/userconsole">
                <ListItemIcon>
                  <Icon fontSize="large">
                    lock_open
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button component={RouterLink} to="/settings">
                <ListItemIcon>
                  <Icon fontSize="large">
                    settings
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Language Settings" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </LayoutContext.Consumer>
  );
}
