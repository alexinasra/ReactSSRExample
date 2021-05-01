import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import LayoutAppBar from '../LayoutAppBar';
import LayoutSideBar from '../LayoutSideBar';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}), 'LayoutContainer');

export default function LayoutContainer({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <LayoutAppBar />
      <LayoutSideBar />
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
}
