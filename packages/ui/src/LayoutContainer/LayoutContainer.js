import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}), 'LayoutContainer');

export default function LayoutContainer({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      {children}
    </div>
  );
}
