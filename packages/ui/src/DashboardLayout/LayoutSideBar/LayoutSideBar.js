import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import LayoutContext from '../LayoutContext';
import UserProfile from './UserProfile';


export default function LayoutSideBar({ mainNav, secondaryNav}) {
  const [localExpand, setLocalExpand] = React.useState(false);
  const handleLocalExpand = () => setTimeout(() => setLocalExpand(true), 30);
  const handleLocalShrink = () => setTimeout(() => setLocalExpand(false), 360);
  return (
    <LayoutContext.Consumer>
      {({ state: { expandedSidebar } }) => (
        <Drawer
          variant="permanent"
          sx={{
            width: theme => (expandedSidebar || localExpand) ? 240 : theme.spacing(9),
            flexShrink: 0,
            transition: theme => theme.transitions.create(['width']),
            '& .MuiDrawer-paper': {
              transition: theme => theme.transitions.create(['width']),
              width: theme => (expandedSidebar || localExpand) ? 240 : theme.spacing(9),
              boxSizing: 'border-box',
            },
          }}
          anchor="left"
          open={expandedSidebar || localExpand}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: expandedSidebar ? 'center' : 'flex-start',
          }}>
            <RouterLink to="/">
              <img src={`/assets/logo${!expandedSidebar ? '-compact' : ''}.png`} alt="lookfor.ae" />
            </RouterLink>
          </Box>
          <Divider />
          <UserProfile />
          <Divider />
          <Box
            onMouseOver={handleLocalExpand}
            onTouchStart={handleLocalExpand}
            onTouchMove={handleLocalExpand}
            onMouseLeave={handleLocalShrink}
            onTouchEnd={handleLocalShrink}
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
