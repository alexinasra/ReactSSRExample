import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    padding: theme.spacing(2),

  }
}), 'AppLoading');


export default function AppLoading({ children, loadingVariant, loadingValue }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div class={classes.progress}>
        <CircularProgress variant={loadingVariant} value={loadingValue}/>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
