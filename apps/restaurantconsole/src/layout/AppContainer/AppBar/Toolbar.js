import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MUIToolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    boxSizing: 'border-box',
    flexGrow: 1,
    height: theme.mixins.toolbar.minHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

export default function Toolbar() {
  const classes = useStyles();

  return (
    <MUIToolbar className={classes.root}>
      <Button
        color="primary"
        variant="outlined"
        component={Link}
        to="/enable-business"
      >
        Create Business
      </Button>
    </MUIToolbar>
  );
}
