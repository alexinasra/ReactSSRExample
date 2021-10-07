import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LayoutContext from '../LayoutContext';
import SideBarReducer, * as actions from '../SideBarReducer';

export default function LayoutContainer({ children }) {
  const [state, dispatch] = React.useReducer(SideBarReducer, {
    expandedSidebar: true
  });
  return (
    <LayoutContext.Provider value={{
      state,
      expandSidebar: () => dispatch(actions.expandSidebarAction()),
      shrinkSidebar: () => dispatch(actions.shrinkSidebarAction()),
      toggleSidebar: () => dispatch(state.expandedSidebar ? actions.shrinkSidebarAction()
        : actions.expandSidebarAction()),
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
