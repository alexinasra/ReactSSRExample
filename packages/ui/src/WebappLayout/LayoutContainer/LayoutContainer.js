import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import LayoutContentContainer from '../LayoutContentContainer';
import LayoutAppBar from '../LayoutAppBar';
import LayoutBottomBar from '../LayoutBottomBar';

export default function LayoutContainer({
  children
}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <LayoutAppBar />
      <LayoutContentContainer>
        {children}
      </LayoutContentContainer>
      <LayoutBottomBar />
    </Box>
  );
}
