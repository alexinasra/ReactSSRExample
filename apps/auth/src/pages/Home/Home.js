import React from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AuthReport from '@react-ssrex/ui/build/AuthReport';
import AuthPage from '../../layout/AuthPage';

export default function Home() {
  return (
    <AuthReport>
      {({ userInRole }) => (userInRole ? (
        <AuthPage>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stritch',
            justifyContent: 'center',
          }}
          >
            <Avatar
              sx={{
                alignSelf: 'center',
                width: 120,
                height: 120,
              }}
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
          </Box>
        </AuthPage>
      ) : (
        <Redirect to="/auth/signin" />
      ))}
    </AuthReport>
  );
}
