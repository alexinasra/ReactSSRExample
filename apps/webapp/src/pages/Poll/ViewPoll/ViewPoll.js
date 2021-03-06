import React from 'react';
import { useParams } from 'react-router-dom';
import LayoutPage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';
import GqlQuery from '@react-ssrex/ui/build/GqlQuery';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { gql } from '@apollo/client';
import PollOptionsList from './PollOptionsList';
import PollSkeleton from './PollSkeleton';

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
      <GqlQuery
        query={GET_POLL_Q}
        renderLoading={() => (<PollSkeleton />)}
        variables={{ pollId }}
      >
        {({ getPoll }) => (
          <Box
            sx={{
              marginTop: (theme) => theme.spacing(3),
              marginBottom: (theme) => theme.spacing(3),
            }}
          >
            <Typography variant="title">{getPoll.subject}</Typography>
            <Box>
              <PollOptionsList poll={getPoll} />
            </Box>
          </Box>
        )}
      </GqlQuery>
    </LayoutPage>
  );
}
