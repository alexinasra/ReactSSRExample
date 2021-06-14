import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AuthStatus from './AuthStatus';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  toolbar: {
  },
}));
export default function LayoutAppBar({children}) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        {children}
        <AuthStatus />
      </Toolbar>
    </AppBar>
  );
}
