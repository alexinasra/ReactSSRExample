import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';

import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import LayoutContext from '../LayoutContext';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
}));
export default function LayoutSideBarToggle() {

  const classes = useStyles();
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
            className={clsx(
              classes.menuButton, state.expandedSidebar && classes.menuButtonHidden,
            )}
          >
            <Icon>menu</Icon>
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={shrinkSidebar}
            className={clsx(
              classes.menuButton, !state.expandedSidebar && classes.menuButtonHidden,
            )}
          >
            <Icon>{theme.direction === 'rtl' ? 'chevron_right' : 'chevron_left'}</Icon>
          </IconButton>
        </>
      )}
    </LayoutContext.Consumer>
  );
}
