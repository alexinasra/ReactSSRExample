import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 30,
  },
}));

export default function AppPage({ className, children }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {children}
    </div>
  );
}
