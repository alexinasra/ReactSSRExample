import React from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { gql, useMutation } from '@apollo/client';

const APPROVE_POLL_M = gql`
mutation ApprovePoll ($pollId: String!) {
  approvePoll(pollId: $pollId) {
    approved
    error
    poll {
      id
      userId
      subject
      approved
      options {
        id
        text
        voters
        votersCount
      }
      votersCount
    }
  }
}
`;

export default function ApprovePoll({ children }) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const [approvePollM] = useMutation(APPROVE_POLL_M, {
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
