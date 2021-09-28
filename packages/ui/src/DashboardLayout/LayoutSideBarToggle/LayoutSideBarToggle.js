import React from 'react';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';

import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import LayoutContext from '../LayoutContext';

export default function LayoutSideBarToggle() {
  const theme = useTheme();
  return (
    <LayoutContext.Consumer>
      {({ state, shrinkSidebar, expandSidebar }) => (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={expandSidebar}
            sx={{
              marginRight: 36,
              display: state.expandedSidebar: 'none' ? 'inline-block',
            }}
          >
            <Icon>menu</Icon>
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={shrinkSidebar}
            sx={{
              marginRight: 36,
              display: !state.expandedSidebar: 'none' ? 'inline-block',
            }}
          >
            <Icon>{theme.direction === 'rtl' ? 'chevron_right' : 'chevron_left'}</Icon>
          </IconButton>
        </>
      )}
    </LayoutContext.Consumer>
  );
}
