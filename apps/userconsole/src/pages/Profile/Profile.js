import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutBasePage';
import EditProfile from './EditProfile';
import EditProfilePicture from './EditProfilePicture';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <LayoutPage containerClassName={classes.root}>
      <Grid container>
        <Grid item md={6}>
          <EditProfile />
        </Grid>
        <Grid item md={6}>
          <EditProfilePicture />
        </Grid>
      </Grid>
    </LayoutPage>
  );
}
