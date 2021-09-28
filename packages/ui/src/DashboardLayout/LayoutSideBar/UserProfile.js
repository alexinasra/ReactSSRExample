import React from 'react';
import clsx from 'clsx';
import { useQuery, gql } from '@apollo/client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LayoutContext from '../LayoutContext';
import UserBadge from './UserBadge';
import { styled } from '@mui/material/styles';
const SIDEBAR_PROFILE = gql`
query SidebarProfile {
  userInRole {
    id
    firstname
    lastname
    email
    profilePicture
  }
}
`;


export default function UserProfile() {
  const { data, loading, error } = useQuery(SIDEBAR_PROFILE);
  if (loading) {
    return (<p>Loading</p>);
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, 2)}</pre>);
  }
  return (
    <LayoutContext.Consumer>
      {({ state }) => ((state.expandedSidebar) ? (
        <Box sx={{
          paddingTop: theme => theme.spacing(3),
          paddingBottom: theme => theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <UserBadge user={data.userInRole} size="lg" />
          <Box align="center">
            <Typography variant="body1" color="textPrimary">
              {`${data.userInRole.firstname} ${data.userInRole.lastname}`}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {data.userInRole.email}
            </Typography>
          </Box>
        </Box>
      ) : (
        <List>
          <ListItem>
            <ListItemIcon>
              <UserBadge user={data.userInRole} size="sm" />
            </ListItemIcon>
            <ListItemText
              primary={`${data.userInRole.firstname} ${data.userInRole.lastname}`}
              secondary={data.userInRole.email}
            />
          </ListItem>
        </List>
      ))}
    </LayoutContext.Consumer>
  );
}
