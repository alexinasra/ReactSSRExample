import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import LayoutContentContainer from '../LayoutContentContainer';
import LayoutAppBar from '../LayoutAppBar';
import LayoutBottomBar from '../LayoutBottomBar';

const useStyles = makeStyles((theme) => ({
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
      <LayoutAppBar />
      <LayoutContentContainer>
        {children}
      </LayoutContentContainer>
      <LayoutBottomBar />
    </div>
  );
}
