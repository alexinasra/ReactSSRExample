import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import LayoutContext from '../LayoutContext';
import { styled } from '@mui/material/styles'

const LayoutAppBarDecorator = styled(AppBar, {
  shouldForwardProp: (prop) => prop!=='expand'
})(({ theme, expand }) => ({
    marginLeft: expand? 240:72,
    width: `calc(100% - ${expand? 240:72}px)`,
    transition: theme.transitions.create(['width', 'marginLeft', 'marginRight'])
}))

export default function LayoutAppBar({children}) {
  const {
    state, expandSidebar, shrinkSidebar,
  } = React.useContext(LayoutContext);

  return (
    <LayoutAppBarDecorator
      position="fixed"
      expand={state.expandedSidebar}>
      <Toolbar sx={{paddingRight: 24}}>
        {children}
      </Toolbar>
    </LayoutAppBarDecorator>
  );
}
