import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Notifications from '../../Notifications';


const useStyles = makeStyles((theme) => ({
  root: {},
  notification: {
    background: theme.palette.grey[theme.palette.type ==="dark"? 500: 100]
  },

}));


export default function NotificationsPanel() {
  const classes = useStyles();
  
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
