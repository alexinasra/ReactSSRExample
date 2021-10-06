import React from 'react';
import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutBasePage';
import GqlQuery from '@react-ssrex/ui/build/GqlQuery';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { gql } from '@apollo/client';

import { TransitionGroup } from 'react-transition-group';
import Fade from '@mui/material/Fade';
import ApprovePoll from './actions/ApprovePoll';

const POLLS_Q = gql`
query FetchPolls ($filter: PollsFilter) {
  fetchPolls (filter: $filter) {
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
`;

const PollRow = styled('div')({
  display: 'flex',
});
const PollSubject = styled('div')({
  flexGrow: 1,
});

export default function HomePage() {
  const [show, setShow] = React.useState('all');

  return (
    <LayoutPage>
      <ApprovePoll>
        {({ approvePoll }) => (
          <GqlQuery query={POLLS_Q} variables={{ filter: { show } }}>
            {({ fetchPolls }) => (
              <Stack spacing={1}>
                <Toolbar variant="dense">
                  <FormControl variant="filled">
                    <InputLabel id="show-select-label">show</InputLabel>
                    <Select
                      labelId="show-select-label"
                      id="show-select"
                      value={show}
                      onChange={(e) => setShow(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="!approved">Notapproved</MenuItem>
                    </Select>
                  </FormControl>
                </Toolbar>

                <TransitionGroup>
                  {fetchPolls && fetchPolls.length ? fetchPolls.map((p) => (
                    <Fade key={p.id}>
                      <PollRow>
                        <PollSubject>
                          {p.subject}
                        </PollSubject>
                        <Button
                          disabled={p.approved}
                          onClick={() => approvePoll(p.id)}
                        >
                          Approve
                        </Button>
                      </PollRow>
                    </Fade>
                  )) : (
                    <Fade>
                      <PollRow>
                        <PollSubject>
                          no polls found
                        </PollSubject>
                      </PollRow>
                    </Fade>
                  )}

                </TransitionGroup>
              </Stack>
            )}
          </GqlQuery>
        )}
      </ApprovePoll>
    </LayoutPage>
  );
}
