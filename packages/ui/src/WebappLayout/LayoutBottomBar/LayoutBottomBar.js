import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ThemeModeToggle from '../../ThemeModeToggle';
import ThemePaletteSelect from '../../ThemePaletteSelect';
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
          <ThemeModeToggle color="primary" />
          <ThemePaletteSelect color="primary" />
        </div>
        <div className={classes.toolbarGrow}>
          {children}
        </div>
      </Toolbar>
    </AppBar>
  );
}
