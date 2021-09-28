import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import AuthStatus from './AuthStatus';


export default function LayoutAppBar({children}) {

  return (
    <AppBar
      position="fixed"
      sx={{ display: 'flex' }}
    >
      <Toolbar sx={{ flexGrow: 1, display: 'flex'}}>
        <Box sx={{ flexGrow: 1 }}>
          <Link color="inherit" href='/'>
            <img height="60" src="/assets/logo.png" alt="logo" />
          </Link>
          {children}
        </Box>
        <AuthStatus />
      </Toolbar>
    </AppBar>
  );
}
