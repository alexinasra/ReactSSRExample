import React, { Suspense } from 'react';

import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import Divider from '@mui/material/Divider';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StatusBadge from '../../StatusBadge';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AuthReport from '../../AuthReport';
import MenuPanel from './MenuPanel';
import NotificationsPanel from './NotificationsPanel';
import { Status } from '../../StatusBadge/StatusBadge';

type authDrawerProps = {
  tabId: string,
  onTabChange: (tabId: string) => void,
  onClose: () => void
}

export default function AuthDrawer({
  tabId,
  onTabChange,
  onClose
}: authDrawerProps) {
  return (
    <AuthReport>
      {({ userInRole }) => userInRole && (
        <Drawer
          anchor="right"
          open={!!tabId}
          onClose={onClose}
        >
          <Tabs
            variant="fullWidth"
            onChange={(e, tabId) => onTabChange(tabId)}
            value={tabId}>
            <Tab value="notifications" icon={<Icon>notifications</Icon>} />
            <Tab value="menu" icon={<Icon>menu</Icon>} />
          </Tabs>
          <Box sx={{
            paddingTop: theme => theme.spacing(3),
            paddingBottom: theme => theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <StatusBadge status={Status.Online}>
              <Avatar sx={{
                width: theme => theme.spacing(8),
                height: theme => theme.spacing(8),
              }}
              src={userInRole.profilePicture} />
            </StatusBadge>
            <Box>
              <Typography variant="body1" color="textPrimary">
                {`${userInRole.firstname} ${userInRole.lastname}`}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {userInRole.email}
              </Typography>
            </Box>
          </Box>
          <Divider />
          {(tabId == 'menu') && <MenuPanel />}
          {(tabId == 'notifications') && <NotificationsPanel />}
          <Divider />
          <Box sx={{ flexGrow: 1}} />
          <BottomNavigation>
            <BottomNavigationAction
             component="a" href="/userconsole"
              icon={<Icon>manage_accounts</Icon>} />
            <BottomNavigationAction
             component="a" href="/auth/signout"
              icon={<Icon>logout</Icon>} />
          </BottomNavigation>
        </Drawer>
      )}
    </AuthReport>
  );
}
