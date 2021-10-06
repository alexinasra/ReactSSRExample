import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutPaperPage';
import {
  SystemNotificationsQuery,
  SystemNotificationsSubscription,
  PublishSystemNotificationMutation,
} from '../../schema.graphql';

export default function SystemNotifications() {
  const {
    data, loading, error, subscribeToMore,
  } = useQuery(SystemNotificationsQuery);
  const [publishSystemNotification] = useMutation(PublishSystemNotificationMutation);
  const [message, setMessage] = React.useState('');

  const handleSubmit = () => {
    if (message) {
      publishSystemNotification({
        variables: {
          message,
        },
      }).then(() => {
        setMessage('');
      });
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  React.useEffect(() => {
    subscribeToMore({
      document: SystemNotificationsSubscription,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newSystemNotification;
        if (prev.systemNotifications.find((o) => o.id === newFeedItem.id)) {
          return prev;
        }
        return { ...prev, systemNotifications: [...prev.systemNotifications, newFeedItem] };
      },
    });
  }, []);
  if (error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }
  if (loading) {
    return (<p>Loading...</p>);
  }
  return (
    <LayoutPage>
      <TextareaAutosize value={message} onChange={handleChange} minRows={5} />
      <Button disabled={!message} onClick={handleSubmit}>Send</Button>
      {
        data.systemNotifications.map((n, index) => (
          <p key={n.id}>{`${index + 1} : ${n.message}`}</p>
        )).reverse()
      }
    </LayoutPage>
  );
}
