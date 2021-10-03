import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import VoteOnPoll from '../../actions/VoteOnPoll';

const VerticalBar = function VerticalBar({ value }) {
  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
      opacity: 0.2,
    }}
    >
      <Box sx={{
        backgroundColor: 'primary.main',
        borderRadius: 1,
        width: `${value || 0}%`,
        height: '100%',
      }}
      />
    </Box>
  );
};

export default function PollOptionsList({ poll }) {
  return (
    <VoteOnPoll>
      {({ vote }) => (
        <List disablePadding>
          {poll.options.map((o) => (
            <ListItemButton
              selected={poll.myVote && poll.myVote.id === o.id}
              disabled={!!poll.myVote}
              key={o.id}
              onClick={() => vote(poll.id, o.id)}
              sx={{
                my: 3,
                border: 1,
                position: 'relative',
                display: 'flex',
                opacity: 1,
                background: (theme) => {
                  const variant = theme.palette.mode === 'dark' ? 700 : 200;
                  return theme.palette.grey[variant];
                },
                borderRadius: 1,
                '&.Mui-disabled': {
                  opacity: 1,
                },
                '&.Mui-selected': {
                  background: 'secondary.main',
                  boxShadow: 3,
                },
              }}
            >
              <VerticalBar value={(o.votersCount / poll.votersCount) * 100} />
              <Typography sx={{
                flexGrow: 1,
              }}
              >
                {o.text}
              </Typography>
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
      )}
    </VoteOnPoll>
  );
}
