import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AuthStatus from './AuthStatus';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    flexGrow: 1,
    display: 'flex',
  },
  toolbarGrow: {
    flexGrow: 1
  }
}));
export default function LayoutAppBar({children}) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarGrow}>
          {children}
        </div>
        <AuthStatus />
      </Toolbar>
    </AppBar>
  );
}
