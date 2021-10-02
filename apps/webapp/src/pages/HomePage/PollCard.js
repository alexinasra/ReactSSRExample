import React from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import VoteOnPoll from '../actions/VoteOnPoll';

export default function PollCard({
  poll,
}) {
  return (
    <VoteOnPoll>
      {({ vote }) => (
        <Card
          raised={!poll.myVote}
          sx={{
            marginTop: (theme) => theme.spacing(3),
            marginBottom: (theme) => theme.spacing(3),
          }}
        >
          <CardHeader title={poll.subject} />
          <CardContent>
            <List>
              {poll.options.map((o) => (
                <ListItemButton
                  selected={poll.myVote && poll.myVote.id === o.id}
                  disabled={!!poll.myVote}
                  key={o.id}
                  onClick={() => vote(poll.id, o.id)}
                >
                  <Typography>{o.text}</Typography>
                  {poll.myVote && (
                  <Typography>
                    {o.votersCount}
                    /
                    {poll.votersCount}
                  </Typography>
                  )}
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </VoteOnPoll>
  );
}
