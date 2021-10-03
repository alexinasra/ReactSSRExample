import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import PollOptionsList from '../Poll/ViewPoll/PollOptionsList';

export default function PollCard({
  poll,
}) {
  return (
    <Card
      raised={!poll.myVote}
      sx={{
        my: 5,
      }}
    >
      <CardHeader title={poll.subject} />
      <CardContent>
        <PollOptionsList poll={poll} />
      </CardContent>
    </Card>
  );
}
