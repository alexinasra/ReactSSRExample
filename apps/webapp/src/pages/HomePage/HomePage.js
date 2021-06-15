import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LayoutBasePage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
    <LayoutBasePage className={classes.root}>
      <Card>
        <CardContent>
          testing card
        </CardContent>
      </Card>
    </LayoutBasePage>
  );
}
