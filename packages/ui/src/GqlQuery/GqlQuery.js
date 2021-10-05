import React from 'react';
import { useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function GqlQuery({
  query,
  variables,
  renderError = (e) => (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <pre>
        {JSON.stringify(e, null, '*')}
      </pre>
    </Alert>
  ),
  renderLoading = () => (
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>),
  children
}) {
  const { data, loading, error, refetch } = useQuery(query, { variables });

  if (loading) {
    return renderLoading();
  }
  if (error) {
    return renderError(error);
  }
  return children(data, refetch);
}
