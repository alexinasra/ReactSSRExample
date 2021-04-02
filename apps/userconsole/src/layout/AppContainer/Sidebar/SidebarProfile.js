import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
    margin: `${theme.spacing(2)}px ${theme.spacing(5)}px`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

export default function SidebarProfile() {
  const classes = useStyles();
  const { data, loading, error } = useQuery(SIDEBAR_PROFILE);
  if (loading) {
    return (<p>Loading</p>);
  }
  if (error) {
    return (<pre>JSON.stringify(error, null, 2)</pre>);
  }
  return (
    <Paper variant="outlined" elevation={3} className={classes.root}>
      <Avatar className={classes.avatar} src={data.userInRole.profilePicture} size="lg" />
      <Typography variant="h4">
        {`${data.userInRole.firstname} ${data.userInRole.lastname}`}
      </Typography>
      <Typography variant="subtitle2">
        {data.userInRole.email}
      </Typography>
    </Paper>
  );
}
