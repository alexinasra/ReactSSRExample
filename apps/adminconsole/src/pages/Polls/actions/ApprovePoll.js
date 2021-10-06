import React from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useMutation } from '@apollo/client';
import { ApprovePollMutation } from '../../../schema.graphql';

export default function ApprovePoll({ children }) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const [approvePollM] = useMutation(ApprovePollMutation, {
    refetchQueries: ['FetchPolls'],
  });
  const approvePoll = (pollId) => {
    approvePollM({
      variables: { pollId },
    }).then(({ data }) => {
      if (!data.approvePoll.approved) {
        setErrorMsg(data.approvePoll.error);
        setSnackbarOpen(true);
      }
    }).catch((error) => {
      setErrorMsg(error.message);
      setSnackbarOpen(true);
    });
  };
  return (
    <>
      {children({ approvePoll })}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error">{errorMsg}</Alert>
      </Snackbar>
    </>
  );
}
