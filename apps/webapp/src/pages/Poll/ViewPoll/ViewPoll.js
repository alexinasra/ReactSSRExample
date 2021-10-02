import React from 'react';
import { useParams } from 'react-router-dom';
import LayoutPage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { gql, useQuery } from '@apollo/client';

import VoteOnPoll from '../../actions/VoteOnPoll';

const GET_POLL_Q = gql`
query ($pollId: String!) {
  getPoll(pollId: $pollId) {
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
`;

export default function ViewPoll() {
  const { pollId } = useParams();
  const { data, loading, error } = useQuery(GET_POLL_Q, {
    variables: { pollId },
  });

  if (loading) {
    return (<p>Loading</p>);
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, '*')}</pre>);
  }
  return (
    <LayoutPage decorate>
      <VoteOnPoll>
        { ({ vote }) => (
          <Box
            sx={{
              marginTop: (theme) => theme.spacing(3),
              marginBottom: (theme) => theme.spacing(3),
            }}
          >
            <Typography variant="title">{data.getPoll.subject}</Typography>
            <Box>
              <List>
                {data.getPoll.options.map((o) => (
                  <ListItemButton
                    selected={data.getPoll.myVote && data.getPoll.myVote.id === o.id}
                    disabled={!!data.getPoll.myVote}
                    onClick={() => vote(data.getPoll.id, o.id)}
                    key={o.id}
                  >
                    <Typography>{o.text}</Typography>
                    {data.getPoll.myVote && (
                    <Typography>
                      {o.votersCount}
                      /
                      {data.getPoll.votersCount}
                    </Typography>
                    )}
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </VoteOnPoll>
    </LayoutPage>
  );
}
