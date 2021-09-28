import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import LayoutContext from '../LayoutContext';

export default function LayoutAppBar({children}) {
  const {
    state, expandSidebar, shrinkSidebar,
  } = React.useContext(LayoutContext);

  return (
    <AppBar
      position="fixed"
      sx={state.expandedSidebar ? {
          marginLeft: 240,
          width: `calc(100% - ${240}px)`,
        } : {
        marginLeft: 72,
        width: `calc(100% - ${72}px)`,
      }}>
      <Toolbar sx={{paddingRight: 24}}>
        {children}
      </Toolbar>
    </AppBar>
  );
}
