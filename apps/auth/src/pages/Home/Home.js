import React from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AuthReport from '@react-ssrex/ui/build/AuthReport';
import AuthPage from '../../layout/AuthPage';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stritch',
    justifyContent: 'center',
  },
  avatar: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },

}));

export default function Home() {
  const classes = useStyles();
  return (
    <AuthReport>
      {({ userInRole }) => (userInRole ? (
        <AuthPage>
          <div className={classes.root}>
            <Avatar
              className={classes.avatar}
              src={userInRole.profilePicture}
            />
            <div>
              <Divider />
              <Typography variant="subtitle1" align="center">
                {`${userInRole.firstname} ${userInRole.lastname}`}
              </Typography>
              <Typography variant="subtitle2" align="center">
                {userInRole.email}
              </Typography>
              <RouterLink component={Link} to="/signout">
                Signout
              </RouterLink>
            </div>
          </div>
        </AuthPage>
      ) : (
        <Redirect to="/auth/signin" />
      ))}
    </AuthReport>
  );
}
