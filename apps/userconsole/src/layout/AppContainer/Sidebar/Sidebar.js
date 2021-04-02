import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import SidebarProfile from './SidebarProfile';
import SidebarNav from './SidebarNav';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
  },
  bottomNav: {
    background: theme.palette.grey[900],
  },
  navIcon: {
    color: theme.palette.primary.contrastText,
  },
}));
export default function Sidebar() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <SidebarProfile />
      <SidebarNav />
    </Paper>
  );
}
