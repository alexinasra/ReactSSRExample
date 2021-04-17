import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  paper: {
    height: 'calc(100vh - 270px)',
    position: 'absolute',
    top: -260,
    left: 50,
    right: 50,
  },

}));

export default function LayoutPage({ children }) {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </Container>
  );
}
