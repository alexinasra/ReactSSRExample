import React from 'react';

import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress: {
    //padding: theme.spacing(2),

  }
}), 'AppLoading');


export default function AppLoading({ children, loadingVariant, loadingValue }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.progress}>
        <CircularProgress variant={loadingVariant} value={loadingValue}/>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
