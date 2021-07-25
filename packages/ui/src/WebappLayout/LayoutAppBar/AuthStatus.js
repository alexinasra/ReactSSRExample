import React from 'react';
import { useTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import AuthReport from '../../AuthReport';

import AuthDrawer from './AuthDrawer';
import Notifications from '../../Notifications';

const useStyles = makeStyles((theme) => ({
  root: {},
  authStatus: {
    display: 'flex',
    alignItems: 'center',
  }
}));


export default function AuthStatus() {
  const classes = useStyles();
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
        <div className={classes.root}>
          <div className={classes.authStatus}>
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
          </div>
        </div>
      )}
    </AuthReport>
  );
}
