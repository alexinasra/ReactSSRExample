import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import AppBar from './AppBar';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: `${theme.mixins.toolbar.minHeight + theme.spacing(4)}px`,
    border: '1px solid',
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
  aside: {
    display: 'flex',
    flexDirection: 'column',
    margin: `${theme.spacing(2)}px ${theme.spacing(8)}px`,
  },
  contentContainer: {

  },
}));

export default function AppContainer({
  children,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar />
      <Grid container>
        <Grid
          item
          className={classes.aside}
        >
          <Sidebar />
        </Grid>
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
