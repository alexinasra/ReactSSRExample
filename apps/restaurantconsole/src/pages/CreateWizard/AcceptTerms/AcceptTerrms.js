import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RouterLink as Link } from 'react-router';
import Button from '@material-ui/core/Button';
import Page from '../../layout/Page';

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    display: 'flex',
    flexDirection: 'column',
  }
}));

export default function AcceptTerms () {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <Paper className={classes.paper}>
        <Typography>
          Terms of usage
        </Typography>
        <div>
          <Button component={RouterLink} to="/">
            Accept
          </Button>
          <Button component='a' href="/">
            Decline
          </Button>
        </div>
      </Paper>
    </Page>
  );
}
