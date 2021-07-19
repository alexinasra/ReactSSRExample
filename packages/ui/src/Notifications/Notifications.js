import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { gql, useQuery } from '@apollo/client';


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
export default function Notifications(){
  const { data, error, loading, subscribeToMore } = useQuery(NOTIFICATIONS_Q);
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
  return (
    <List>
      {loading && (
        <ListItem>Loading ...</ListItem>
      )}
      {!loading && error && (
        <ListItem>Error</ListItem>
      )}
      {!loading && data && data.notifications.map(n => (
        <ListItem key={n.id}>{n.message}</ListItem>
      ))}

    </List>
  );
}
