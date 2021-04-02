import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  root: {
    // border: '1px solid '
  },
  contentContainer: {},
}));

export default function AppContainer({ appBar, children }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      {appBar && appBar}
      <Container className={classes.contentContainer}>
        {children}
      </Container>
    </Container>
  );
}
