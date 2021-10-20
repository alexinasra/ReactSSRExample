import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LayoutContext from '../LayoutContext';
import SideBarReducer, * as actions from '../SideBarReducer';

export default function LayoutContainer({ children }) {
  const [state, dispatch] = React.useReducer(SideBarReducer, {
    expanded: true,
    mouseOver: false
  });
  return (
    <LayoutContext.Provider value={{
      ...state,
      expandSidebar: () => dispatch(actions.expandSidebarAction()),
      shrinkSidebar: () => dispatch(actions.shrinkSidebarAction()),
      toggleSidebar: () => dispatch(actions.toggleSidebarAction()),
      mouseOverSidebar: () => dispatch(actions.mouseOverSidebarAction()),
      mouseOutSidebar: () => dispatch(actions.mouseOutSidebarAction()),
    }}
    >
    <Box component="div" sx={{
      display: 'flex',
      minHeight: '100vh' }}
    >
      <CssBaseline />
      {children}
    </Box>
  </LayoutContext.Provider>
  );
}
