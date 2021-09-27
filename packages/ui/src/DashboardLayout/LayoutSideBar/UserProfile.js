import React from 'react';
import clsx from 'clsx';
import { useQuery, gql } from '@apollo/client';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StatusBadge from '@react-ssrex/ui/build/StatusBadge';
import LayoutContext from '../LayoutContext';

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

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(SIDEBAR_PROFILE);
  if (loading) {
    return (<p>Loading</p>);
  }
  if (error) {
    return (<pre>JSON.stringify(error, null, 2)</pre>);
  }
  return (
    <LayoutContext.Consumer>
      {({ state }) => ((state.expandedSidebar) ? (
        <Box className={clsx(classes.root)}>
          <StatusBadge status="online">
            <Avatar className={classes.largeAvatar} src={data.userInRole.profilePicture} />
          </StatusBadge>
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
              <StatusBadge status="online">
                <Avatar className={classes.smallAvatar} src={data.userInRole.profilePicture} />
              </StatusBadge>
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
