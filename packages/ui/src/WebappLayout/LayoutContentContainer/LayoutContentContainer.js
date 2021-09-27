import React from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}), 'LayoutContentContainer');

export default function LayoutContentContainer({children}) {

  const classes = useStyles();
  return (
    <main className={classes.root}>
      {children}
    </main>
  );
}
