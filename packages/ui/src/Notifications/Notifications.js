import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';


const NOTIFICATIONS_Q = gql`
query {
  notifications {
    id
    message
    publisher
    checked
  }
}
`;
const NOTIFICATIONS_S = gql`
subscription {
  newNotification {
    id
    message
    publisher
    checked
  }
}
`;

const CHK_NOTIFICATION_M = gql`
mutation CheckNotifications($notificationIds: [String!]!){
  checkNotifications(notificationIds: $notificationIds) {
    checked {
      id
      message
      publisher
      checked
    }
  }
}
`;
export default function Notifications({ children }){
  const { data, error, loading, subscribeToMore } = useQuery(NOTIFICATIONS_Q);
  const [checkNotifications] = useMutation(CHK_NOTIFICATION_M);

  React.useEffect(() => {
    subscribeToMore({
      document: NOTIFICATIONS_S,
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
