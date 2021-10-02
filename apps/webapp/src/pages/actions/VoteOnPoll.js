import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Link from '@mui/material/Link';

import { gql, useMutation } from '@apollo/client';

const VOTE_M = gql`
mutation ($input: VoteOnPollInput!) {
  voteOnPoll(input: $input) {
    voted
    error
    poll {
      id
      userId
      subject
      options {
        id
        text
        voters
        votersCount
      }
      myVote {
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

export default function VoteOnPoll({ children }) {
  const [voteOnPoll] = useMutation(VOTE_M);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const vote = (pollId, optionId) => {
    voteOnPoll({
      variables: { input: { pollId, optionId } },
    }).then(() => setSnackbarOpen(true)).catch(() => setDialogOpen(true));
  };

  return (
    <>
      {children({ vote })}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">vote accepted</Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <Link href="/auth/signin">Click here to signin</Link>
        </DialogContent>
      </Dialog>
    </>
  );
}
