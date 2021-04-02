import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import AppBar from './AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: 0,
    margin: 0,
  },
  logoContainer: {
    display: 'inline-flex',
    height: theme.mixins.toolbar.minHeight - 2,
    justifyContent: 'center',
    margin: `auto ${theme.spacing(2)}px`,
    alignItems: 'center',
    boxSizing: 'border-box',
    color: theme.palette.grey['300'],
    '&  .MuiIconButton-root': {
      color: theme.palette.grey['300'],
    },
  },
  hasAppBar: {
    paddingTop: `${theme.mixins.toolbar.minHeight + theme.spacing(4)}px`,
  },
  contentContainer: {

  },
}));

export default function AppContainer({
  disableAppBar,
  children,
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, { hasAppBar: !disableAppBar })}>
      { !disableAppBar && <AppBar /> }

      <Grid container>
        <Grid
          item
          className={classes.contentContainer}
        >
          {children}
        </Grid>
      </Grid>
    </div>
  );
}
