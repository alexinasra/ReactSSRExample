import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MainList from './MainList';
import SecondaryList from './SecondaryList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'space-between',
  },
}));

export default function SidebarNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainList />
      <SecondaryList />
    </div>
  );
}
