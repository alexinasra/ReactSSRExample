import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import LayoutContext from '../LayoutContext';
import { styled, Theme } from '@mui/material/styles'


type layoutAppBarDecoratorProps = { theme?: Theme, expand: boolean }

const LayoutAppBarDecorator = styled(AppBar, {
  shouldForwardProp: (prop) => prop!=='expand'
})(({ theme, expand }: layoutAppBarDecoratorProps) => ({
  padding:0,
  margin:0,
  marginLeft: expand? 240:72,
  width: `calc(100% - ${expand? 240:72}px)`,
  transition: theme.transitions.create(['width', 'marginLeft', 'marginRight']),
}))

type layoutAppBarProps = {
  children: React.ReactChildren
}

export default function LayoutAppBar({ children }: layoutAppBarProps) {
  const {
    expanded, expandSidebar, shrinkSidebar,
  } = React.useContext(LayoutContext);

  return (
    <LayoutAppBarDecorator
      position="fixed"
      expand={expanded}>
      <Toolbar sx={{
        padding:0,
        margin:0,
        display: 'flex',
      }}>
        {children}
      </Toolbar>
    </LayoutAppBarDecorator>
  );
}
