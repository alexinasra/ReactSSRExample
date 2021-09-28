import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function LayoutContainer({ children }) {
  return (
    <Box component="div" sx={{ display: 'flex' }}>
      <CssBaseline />
      {children}
    </Box>
  );
}
