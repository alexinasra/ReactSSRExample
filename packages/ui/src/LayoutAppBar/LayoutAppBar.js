import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import NotificationsIcon from '@material-ui/icons/Notifications';

import LayoutContext from '../LayoutContext';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: 72,
    width: `calc(100% - ${72}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));
export default function LayoutAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const {
    state, expandSidebar, shrinkSidebar, setThemeName, toggleThemeMode,
  } = React.useContext(LayoutContext);

  const handleOpenThemes = (e) => setAnchorEl(e.currentTarget);
  const handleCloseThemes = () => setAnchorEl(null);
  const handleThemeSelection = (themeName) => () => {
    setThemeName({
      variables: {
        themeName,
      },
    }).catch(console.log);
    handleCloseThemes();
  };
  const handleThemeToggle = () => {
    toggleThemeMode().catch(console.log);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(
        classes.root, state.expandedSidebar && classes.appBarShift,
      )}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={expandSidebar}
          className={clsx(
            classes.menuButton, state.expandedSidebar && classes.menuButtonHidden,
          )}
        >
          <Icon>menu</Icon>
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={shrinkSidebar}
          className={clsx(
            classes.menuButton, !state.expandedSidebar && classes.menuButtonHidden,
          )}
        >
          <Icon>{theme.direction === 'rtl' ? 'chevron_right' : 'chevron_left'}</Icon>
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleThemeToggle} color="inherit">
          <Icon>
            {state.themeMode === 'light' ? 'dark_mode' : 'light_mode'}
          </Icon>
        </IconButton>
        <IconButton
          aria-controls="theme-menu"
          aria-haspopup="true"
          ref={anchorEl}
          onClick={handleOpenThemes}
          color="inherit"
        >
          <Icon>
            palette
          </Icon>
        </IconButton>
        <Menu
          id="theme-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseThemes}
        >
          <MenuItem onClick={handleThemeSelection('default')}>default</MenuItem>
          <MenuItem onClick={handleThemeSelection('deepOrange')}>deepOrange</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
