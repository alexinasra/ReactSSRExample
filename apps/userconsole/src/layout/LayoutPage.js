import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function LayoutPage({ children }) {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      {children}
    </Container>
  );
}
