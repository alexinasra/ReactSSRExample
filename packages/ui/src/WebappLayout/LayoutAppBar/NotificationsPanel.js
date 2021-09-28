import React from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SnackbarContent from '@mui/material/SnackbarContent';
import Notifications from '../../Notifications';

export default function NotificationsPanel() {

  React.useEffect(() => {}, [])
  return (
    <Notifications>
    {({ notifications, checkNotifications }) => (
      <>
        <Button
          disabled={notifications.filter(n=>!n.checked).length===0}
          onClick={() => setTimeout(() => {checkNotifications()}, 300)}>
          Checkall
        </Button>
        <Divider />
        <List>
          {
            notifications.filter(n=>!n.checked).length > 0 ? (
              notifications.filter(n=>!n.checked).reverse().map(n => (
                <ListItem key={n.id}>
                  <SnackbarContent
                    action={(
                      <IconButton
                        color="primary"
                        onClick={() => setTimeout(() => {checkNotifications([n.id])}, 300)}>
                        <Icon>clear</Icon>
                      </IconButton>
                    )}
                    message={n.message}/>
                </ListItem>
              ))
            ) : (
              <ListItem>
                No Notifications
              </ListItem>
            )
          }
        </List>
      </>
    )}
    </Notifications>
  );
}
