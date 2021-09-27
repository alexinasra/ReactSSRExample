import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
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
  },
  logo: {
    // height: theme.mixins.toolbar.minHeight-theme.spacing(1)
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
          <Link color="inherit" href='/'>
            <img className={classes.logo} height="60" src="/assets/logo.png" alt="logo" />
          </Link>
          {children}
        </div>
        <AuthStatus />
      </Toolbar>
    </AppBar>
  );
}
