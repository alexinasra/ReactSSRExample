import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  NotificationsQuery,
  NewNotificationSubsription,
  CheckNotificationsMutation
} from '../schema.graphql'

export default function Notifications({ children }){
  const { data, error, loading, subscribeToMore } = useQuery(NotificationsQuery);
  const [checkNotifications] = useMutation(CheckNotificationsMutation);

  React.useEffect(() => {
    subscribeToMore({
      document: NewNotificationSubsription,
      updateQuery( prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newNotification;
        if(prev.notifications.find((o) => o.id === newFeedItem.id)) {
          return prev;
        }
        return Object.assign({} , prev, { notifications: [ ...prev.notifications, newFeedItem]});
      }
    })
  }, [])
  return children({
    checkNotifications: (notifications) => {
      checkNotifications({
        variables: {
          notificationIds: notifications ?? data.notifications.filter(n => !n.checked).map(n => n.id)
        }
      })
    },
    notifications: data? [...data.notifications] : []
  });
}
