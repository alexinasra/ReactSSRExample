import React from 'react';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';

import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import LayoutContext from '../LayoutContext';
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade';

export default function LayoutSideBarToggle() {
  const theme = useTheme();
  const chervonIcon = React.useMemo(
    () => theme.direction === 'rtl' ? 'chevron_right' : 'chevron_left' ,
    [theme]
  );
  return (
    <LayoutContext.Consumer>
      {({ state, toggleSidebar }) => (
        <TransitionGroup>
          <Fade key={state.expandedSidebar? 'expanded':'collapsed'}>
           <IconButton
           edge="start"
           color="inherit"
           aria-label="open drawer"
           onClick={toggleSidebar}
           >
              <Icon>{state.expandedSidebar? 'menu':chervonIcon}</Icon>
            </IconButton>
          </Fade>
        </TransitionGroup>
      )}
    </LayoutContext.Consumer>
  );
}
