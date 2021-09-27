import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: 'transparent',
    top: 'auto',
    bottom: 0,
    justifyContent: 'end'
  },
  toolbar: {
    flexGrow: 1,
    display: 'flex',
  },
  toolbarGrow: {
    flexGrow: 1
  }
}));
export default function LayoutBottomBar({children}) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.root}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.toolbarGrow} />
        <div>
        </div>
        <div className={classes.toolbarGrow}>
          {children}
        </div>
      </Toolbar>
    </AppBar>
  );
}
