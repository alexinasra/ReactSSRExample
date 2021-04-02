import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppPage from '../../layout/AppPage';

const useStyles = makeStyles((theme) => ({
  root: {},
  categoriesGrid: {
    paddingTop: '40px',
  },
  categoryCardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiAvatar-root': {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <AppPage className={classes.root}>
      index
    </AppPage>
  );
}
