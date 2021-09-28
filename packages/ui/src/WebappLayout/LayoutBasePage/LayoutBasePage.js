import React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const AppBarSpace = styled('div')(({theme}) => ({...theme.mixins.toolbar}));

export default function LayoutBasePage({
  children,
}) {
  return (
    <Box sx={{ display: 'relative'}}>
      <AppBarSpace />
      <Container
        maxWidth="xl"
      >
        {children}
      </Container>
    </Box>
  );
}
