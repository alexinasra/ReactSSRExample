import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { gql, useQuery } from '@apollo/client';
import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutPaperPage';

const USERS = gql`
query {
  users{
    id
    email
    firstname
    lastname
    profilePicture
  }
}
`;

export default function Users() {
  const { data, error, loading } = useQuery(USERS);

  if (error) {
    return (<pre>JSON.stringify(error)</pre>);
  }

  if (loading) {
    return <p>loading</p>;
  }
  const { users } = data;

  return (
    <LayoutPage>
      <List sx={{
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
      >
        {
        users.map((user) => (
          <ListItem key={user.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Profile picture" src={user.profilePicture} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.firstname} ${user.lastname}`}
              secondary={user.email}
            />
          </ListItem>
        ))
      }
      </List>
    </LayoutPage>
  );
}
