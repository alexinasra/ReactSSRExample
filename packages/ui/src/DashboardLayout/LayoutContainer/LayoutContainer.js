import React from 'react';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
