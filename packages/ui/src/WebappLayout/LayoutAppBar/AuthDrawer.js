import React, { Suspense } from 'react';

import Button from '@material-ui/core/Button';
import { Translation } from 'react-i18next';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StatusBadge from '../../StatusBadge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ThemePaletteSelect from '../../ThemePaletteSelect';
import ThemeModeToggle from '../../ThemeModeToggle';
import AuthReport from '../../AuthReport';
import MenuPanel from './MenuPanel';
import NotificationsPanel from './NotificationsPanel';


const useStyles = makeStyles((theme) => ({
  root: {},
  authStatus: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    padding: 1,
  },
  drawerProfile: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  drawerAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  paletteMenu: {
    position: 'relative',
    display: 'inline-block',
    border: '1px solid',
    width: 'auto'
  },
  paletteMenuList: {
    display: 'inline-block',
    border: '1px solid',
    position: 'relative',
  }
}));


export default function AuthDrawer({
  tabId,
  onTabChange,
  onClose
}) {
  const classes = useStyles();
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
            onChange={(e, tabId) => onTabChange(tabId)(e)}
            value={tabId}>
            <Tab value="notifications" icon={<Icon>notifications</Icon>} />
            <Tab value="menu" icon={<Icon>menu</Icon>} />
          </Tabs>
          <Box className={classes.drawerProfile}>
            <StatusBadge status="online">
              <Avatar className={classes.drawerAvatar} src={userInRole.profilePicture} />
            </StatusBadge>
            <Box align="center">
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
