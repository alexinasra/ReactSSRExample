import React from 'react';
import Grid from '@material-ui/core/Grid';
import Page from '../../layout/Page';
import EditProfile from './EditProfile';
import EditProfilePicture from './EditProfilePicture';

export default function Profile() {
  return (
    <Page>
      <Grid container>
        <Grid item md={6}>
          <EditProfile />
        </Grid>
        <Grid item md={6}>
          <EditProfilePicture />
        </Grid>
      </Grid>
    </Page>
  );
}