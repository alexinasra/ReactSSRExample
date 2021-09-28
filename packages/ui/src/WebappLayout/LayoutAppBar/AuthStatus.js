import React from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import AuthReport from '../../AuthReport';

import AuthDrawer from './AuthDrawer';
import Notifications from '../../Notifications';

export default function AuthStatus() {
  const { t } = useTranslation('Auth', {
    useSuspense: false
  });
  const [drawerTabId, setDrawerTabId] = React.useState(false);

  const handleDrawerTabChange = (tabId) => () => {
    setDrawerTabId(tabId)
  }
  const handleDrawerTabClose = () => {
    setDrawerTabId(false);
  }
  return (
    <AuthReport>
      {({ userInRole }) => (
        <Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
            {userInRole ? (
                <>
                  <Notifications>
                    {({notifications}) => (
                      <IconButton onClick={handleDrawerTabChange('notifications')}>
                        <Badge
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        badgeContent={notifications.filter(n => !n.checked).length > 99 ? "+99" : notifications.filter(n => !n.checked).length}
                        color="secondary"
                        >
                          <Icon>notifications</Icon>
                        </Badge>
                      </IconButton>
                    )}
                  </Notifications>
                  <IconButton onClick={handleDrawerTabChange('menu')}>
                    <Icon>menu</Icon>
                  </IconButton>
                  <AuthDrawer
                    tabId={drawerTabId}
                    onTabChange={handleDrawerTabChange}
                    onClose={handleDrawerTabClose} />
                </>
              ) : (
                <>
                  <Button href="/auth/signin">
                      {t('SigninButton.text', { defaultValue: 'Sign In' })}
                  </Button>
                  <Button href="/auth/signup">
                      {t('SignupButton.text', { defaultValue: 'Sign Up' })}
                  </Button>
                </>
              )}
          </Box>
        </Box>
      )}
    </AuthReport>
  );
}
