import React from 'react';
import clsx from 'clsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

const FlexGrow = styled('div')({ flexGrow: 1 });
export default function LayoutBottomBar({children}) {

  return (
    <AppBar
      position="fixed"
      sx={{
        display: 'flex',
        background: 'transparent',
        top: 'auto',
        bottom: 0,
        justifyContent: 'end'
      }}
    >
      <Toolbar sx={{
        flexGrow: 1,
        display: 'flex',
      }}>
        <FlexGrow />
        <FlexGrow>
          {children}
        </FlexGrow>
      </Toolbar>
    </AppBar>
  );
}
