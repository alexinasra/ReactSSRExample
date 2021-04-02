import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      height: '300',
      width: '300px'
    },
    [theme.breakpoints.up('md')]: {
      height: '500px',
      width: '500px',
    },
    [theme.breakpoints.up('lr')]: {
      height: '640px',
      width: '640px',
    },
  }
}), 'AppLoading');


export default function AppLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CircularProgress />
      </Paper>
    </div>
  )
}
