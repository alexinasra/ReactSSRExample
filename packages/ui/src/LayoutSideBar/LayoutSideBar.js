import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';

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
    justifyContent: 'center',
    ...theme.mixins.toolbar,
  },
  logoUrl: {
    flexGrow: 1,
    height: theme.mixins.toolbar.minHeight,
  },
  alignStart: {
    justifyContent: 'flex-start',
  },
  logoImg: {
    height: theme.mixins.toolbar.minHeight - theme.spacing(1),
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
  const { t, ready } = useTranslation('UserConsole', { useSuspense: false });
  const [localExpand, setLocalExpand] = React.useState(false);
  const handleLocalExpand = () => setTimeout(() => setLocalExpand(true), 30);
  const handleLocalShrink = () => setTimeout(() => setLocalExpand(false), 360);
  if (!ready) {
    return false;
  }
  return (
    <LayoutContext.Consumer>
      {({ state: { expandedSidebar } }) => (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.root, !expandedSidebar && !localExpand && classes.drawerPaperClose),
          }}
          open={expandedSidebar || localExpand}
        >
          <div className={clsx(classes.toolbarIcon, !expandedSidebar && classes.alignStart)}>
            <RouterLink className={classes.logoLink} to="/">
              <img className={classes.logoImg} src="/assets/logo.png" alt="lookfor.ae" />
            </RouterLink>
          </div>
          <Divider />
          <UserProfile />
          <Divider />
          <Box
            onMouseOver={handleLocalExpand}
            onTouchStart={handleLocalExpand}
            onTouchMove={handleLocalExpand}
            onMouseLeave={handleLocalShrink}
            onTouchEnd={handleLocalShrink}
          >
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
            <Divider />
          </Box>
        </Drawer>
      )}
    </LayoutContext.Consumer>
  );
}
