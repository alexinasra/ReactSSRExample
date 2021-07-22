import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutPaperPage';

const SYS_NOTIFICATIONS_Q = gql`
query {
  systemNotifications {
    id
    publisher
    message
  }
}
`;

const SYS_NOTIFICATIONS_S = gql`
subscription {
  newSystemNotification {
    id
    message
    publisher
  }
}
`;
const SYS_NOTIFICATIONS_M = gql`
mutation ($message: String!) {
  publishSystemNotification(input: $message) {
    id
    message
    publisher
  }
}
`;
const useStyles = makeStyles(() => ({
  root: {},
}));

export default function SystemNotifications() {
  const classes = useStyles();
  const {
    data, loading, error, subscribeToMore,
  } = useQuery(SYS_NOTIFICATIONS_Q);
  const [publishSystemNotification] = useMutation(SYS_NOTIFICATIONS_M);
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
      document: SYS_NOTIFICATIONS_S,
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
    <LayoutPage className={classes.root}>
      <TextareaAutosize value={message} onChange={handleChange} rowsMin={5} />
      <Button disabled={!message} onClick={handleSubmit}>Send</Button>
      {
        data.systemNotifications.map((n, index) => (
          <p key={n.id}>{`${index + 1} : ${n.message}`}</p>
        )).reverse()
      }
    </LayoutPage>
  );
}
