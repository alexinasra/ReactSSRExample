import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles } from '@mui/styles';
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
