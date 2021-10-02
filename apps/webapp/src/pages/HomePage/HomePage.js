import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';

import LayoutBasePage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';
import Typography from '@mui/material/Typography';
import { gql } from '@apollo/client';
import GqlQuery from '@react-ssrex/ui/build/GqlQuery';
import PollCard from './PollCard';

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
}
`;

export default function HomePage() {
  return (
    <LayoutBasePage>
      <GqlQuery query={GET_ALL_Q}>
        {({ allPolls }) => (
          <div>
            {(allPolls && allPolls.length) ? [...allPolls].reverse().map((p) => (
              <div key={p.id}><PollCard poll={p} /></div>
            )) : (
              <Typography>
                No polls available.
              </Typography>
            )}
          </div>
        )}
      </GqlQuery>
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
