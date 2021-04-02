import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppPage from '../../layout/AppPage';

export default function ErrorPage({
  code,
  title,
  children,
}) {
  return (
    <AppPage>
      <Grid container>
        <Grid item xs={3}>
          {code}
        </Grid>
        <Grid item xs={9}>
          {title}
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </AppPage>
  );
}
