import React from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  card: {
    width: '100%',
  },
  cardContent: {
  },
  progress: {
    borderSizing: 'border-box',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
  },
}));

export default function AuthPage({
  children,
  className,
  error,
  loading,
}) {
  const classes = useStyles();
  let display = children;

  if (loading) {
    display = (<div className={classes.progress}><CircularProgress /></div>);
  }
  if (error) {
    display = (<pre>{JSON.stringify(error, null, 4)}</pre>);
  }
  return (
    <Container maxWidth="sm" className={clsx(classes.root, className)}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          {display}
        </CardContent>
      </Card>
    </Container>
  );
}
