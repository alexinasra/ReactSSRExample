import React from 'react';
import { useParams } from 'react-router-dom';
import LayoutPage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';
import GqlQuery from '@react-ssrex/ui/build/GqlQuery';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { gql } from '@apollo/client';

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
  return (
    <LayoutPage decorate>
      <GqlQuery query={GET_POLL_Q} variables={{ pollId }}>
        {({ getPoll }) => (
          <VoteOnPoll>
            { ({ vote }) => (
              <Box
                sx={{
                  marginTop: (theme) => theme.spacing(3),
                  marginBottom: (theme) => theme.spacing(3),
                }}
              >
                <Typography variant="title">{getPoll.subject}</Typography>
                <Box>
                  <List>
                    {getPoll.options.map((o) => (
                      <ListItemButton
                        selected={getPoll.myVote && getPoll.myVote.id === o.id}
                        disabled={!!getPoll.myVote}
                        onClick={() => vote(getPoll.id, o.id)}
                        key={o.id}
                      >
                        <Typography>{o.text}</Typography>
                        {getPoll.myVote && (
                        <Typography>
                          {o.votersCount}
                          /
                          {getPoll.votersCount}
                        </Typography>
                        )}
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
          </VoteOnPoll>
        )}
      </GqlQuery>
    </LayoutPage>
  );
}
