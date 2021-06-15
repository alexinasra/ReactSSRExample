import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}), 'LayoutContainer');
export default function LayoutContainer({
  children
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      {children}
    </div>
  );
}
