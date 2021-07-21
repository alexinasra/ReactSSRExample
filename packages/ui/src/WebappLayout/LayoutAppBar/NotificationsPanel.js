import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Notifications from '../../Notifications';


const useStyles = makeStyles((theme) => ({
  root: {},
  notification: {
    background: theme.palette.grey[theme.palette.type ==="dark"? 500: 100]
  },
  checked: {
    background: theme.palette.grey[theme.palette.type ==="dark"? 700: 300]
  }
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
            notifications.length > 0 ? (
              notifications.reverse().map(n => (
                <ListItem key={n.id} className={clsx(classes.notification ,{[classes.checked]: n.checked})}>
                  {n.message}
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
