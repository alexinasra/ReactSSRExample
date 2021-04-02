import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfileList from './ProfileList';

const useStyles = makeStyles(() => ({
  root: {
  },
}));

export default function MainList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProfileList />
    </div>
  );
}
