import React from 'react';
import Grid from '@mui/material/Grid';
import LayoutBasePage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';

export default function ErrorPage({
  code,
  title,
  children,
}) {
  return (
    <LayoutBasePage>
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
    </LayoutBasePage>
  );
}
