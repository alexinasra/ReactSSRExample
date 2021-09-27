import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

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
}));
export default function LayoutAppBar({children}) {
  const classes = useStyles();
  const {
    state, expandSidebar, shrinkSidebar,
  } = React.useContext(LayoutContext);


  return (
    <AppBar
      position="fixed"
      className={clsx(
        classes.root, state.expandedSidebar && classes.appBarShift,
      )}
    >
      <Toolbar className={classes.toolbar}>
        {children}
      </Toolbar>
    </AppBar>
  );
}
