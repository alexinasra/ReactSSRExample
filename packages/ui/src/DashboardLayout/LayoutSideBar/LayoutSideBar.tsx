import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import UserProfile from './UserProfile';
import { height } from '@mui/system';
import LayoutContext from '../LayoutContext';



type layoutSideBarProps = {
  mainNav: React.ReactNode,
  secondaryNav?: React.ReactNode,
}

export default function LayoutSideBar({ mainNav, secondaryNav}: layoutSideBarProps) {
  
  return (
    <LayoutContext.Consumer>
      {({ expanded, mouseOver, mouseOverSidebar, mouseOutSidebar }) => (
        <Drawer
          variant="permanent"
          sx={{
            width: theme => (expanded || mouseOver) ? 240 : theme.spacing(9),
            transition: theme => theme.transitions.create(['width']),
            '& .MuiDrawer-paper': {
              transition: theme => theme.transitions.create(['width']),
              width: theme => (expanded || mouseOver) ? 240 : theme.spacing(9),
              overflowX: 'hidden'
            },
          }}
          anchor="left"
          open={expanded || mouseOver}
          onMouseOver={mouseOverSidebar}
          onTouchStart={mouseOverSidebar}
          onTouchMove={mouseOverSidebar}
          onMouseLeave={mouseOutSidebar}
          onTouchEnd={mouseOutSidebar}
        >
          <RouterLink to="/">
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ['& img']: {
                height: theme => (theme.mixins.toolbar.minHeight as number) + 8,
              }
            }}>
                <img src={`/assets/logo${(!expanded && !mouseOver) ? '-compact' : ''}.png`} alt="ReactSSREX" />
            </Box>
          </RouterLink>
          <Divider />
          <UserProfile />
          <Divider />
          <Box
            sx={{
              height: '100%',
            }}
          >
            {mainNav}
            {secondaryNav && (
              <>
                <Divider />
                {secondaryNav}
              </>
            )}
          </Box>
        </Drawer>
      )}
    </LayoutContext.Consumer>
  );
}
