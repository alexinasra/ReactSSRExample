import React from 'react';
import Grid from '@mui/material/Grid';
import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutBasePage';
import EditProfile from './EditProfile';
import EditProfilePicture from './EditProfilePicture';

export default function Profile() {
  return (
    <LayoutPage>
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
