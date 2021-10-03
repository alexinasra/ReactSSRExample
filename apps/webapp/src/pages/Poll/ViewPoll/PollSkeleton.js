import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

const SkeletonItem = () => (
  <ListItemButton
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
    <Typography sx={{
      flexGrow: 1,
    }}
    >
      <Skeleton />
    </Typography>
  </ListItemButton>
);

export default function ViewPoll() {
  return (
    <Box
      sx={{
        marginTop: (theme) => theme.spacing(3),
        marginBottom: (theme) => theme.spacing(3),
      }}
    >
      <Typography variant="title"><Skeleton /></Typography>
      <Box>
        <List disablePadding>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </List>
      </Box>
    </Box>
  );
}
