import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

import LayoutBasePage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { gql, useQuery, useMutation } from '@apollo/client';

const GET_ALL_Q = gql`
query {
  allPolls {
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
  userInRole {
    id
  }
}
`;
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

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_ALL_Q);
  const [voteOnPoll] = useMutation(VOTE_M);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleVote = (pollId, optionSelected) => () => {
    if (data && data.userInRole) {
      voteOnPoll({
        variables: {
          input: {
            pollId,
            optionId: optionSelected.id,
          },
        },
      }).then(console.log).catch(console.log);
    } else {
      setDialogOpen(true);
    }
  };
  if (loading) {
    return 'loading';
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, '*')}</pre>);
  }
  return (
    <LayoutBasePage>
      {
        (data && data.allPolls && data.allPolls.length) ? (
          [...data.allPolls].reverse().map((p) => (
            <Card
              key={p.id}
              raised={!p.myVote}
              sx={{
                marginTop: (theme) => theme.spacing(3),
                marginBottom: (theme) => theme.spacing(3),
              }}
            >
              <CardHeader title={p.subject} />
              <CardContent>
                <List>
                  {p.options.map((o) => (
                    <ListItemButton
                      selected={p.myVote && p.myVote.id === o.id}
                      disabled={!!p.myVote}
                      key={o.id}
                      onClick={handleVote(p.id, o)}
                    >
                      <Typography>{o.text}</Typography>
                      {p.myVote && (
                      <Typography>
                        {o.votersCount}
                        /
                        {p.votersCount}
                      </Typography>
                      )}
                    </ListItemButton>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>
            No polls available.
          </Typography>
        )
      }
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <Link href="/auth/signin">Click here to signin</Link>
        </DialogContent>
      </Dialog>
      <Fab
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(4),
          right: (theme) => theme.spacing(8),
        }}
        component={RouterLink}
        to="/poll/create"
      >
        <Icon>add</Icon>
      </Fab>
    </LayoutBasePage>
  );
}
