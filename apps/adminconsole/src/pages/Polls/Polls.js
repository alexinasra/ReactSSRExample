import React from 'react';
import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutBasePage';
import GqlQuery from '@react-ssrex/ui/build/GqlQuery';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import { TransitionGroup } from 'react-transition-group';
import Fade from '@mui/material/Fade';
import ApprovePoll from './actions/ApprovePoll';
import { FetchPollsQuery } from '../../schema.graphql';

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
          <GqlQuery query={FetchPollsQuery} variables={{ filter: { show } }}>
            {({ fetchPolls }) => (
              <Stack spacing={1}>
                <AppBar position="static" variant="dense">
                  <Toolbar variant="dense">
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
                  </Toolbar>
                </AppBar>

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
