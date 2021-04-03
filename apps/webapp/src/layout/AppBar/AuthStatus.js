import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Suspense from '@react-ssrex/ui/build/Suspense';
import { Translation } from 'react-i18next';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const USER_IN_ROLE = gql`
query UserInRole {
  userInRole {
    id
    firstname
    lastname
    email
  }
}
`;

export function AuthStatusLogin() {
  return (
    <>
      <Button href="/auth/signin">
        <Suspense fallback="Sign In">
          <Translation>
            {(t) => t('Auth:SigninButton.text')}
          </Translation>
        </Suspense>
      </Button>
      <Button href="/auth/signup">
        <Suspense fallback="Sign Up">
          <Translation>
            {(t) => t('Auth:SignupButton.text')}
          </Translation>
        </Suspense>
      </Button>
    </>
  );
}

export function AuthStatusProfile({ userInRole }) {
  return (
    <>
      <Link href="/userconsole">{`${userInRole.firstname} ${userInRole.lastname}`}</Link>
      <Button href="/auth/signout">
        <Suspense fallback="Sign Out">
          <Translation>
            {(t) => t('Auth:SignoutButton.text')}
          </Translation>
        </Suspense>
      </Button>
    </>
  );
}

const useStyles = makeStyles(() => ({
  root: {},
}));

export default function AuthStatus() {
  const { loading, error, data } = useQuery(USER_IN_ROLE);

  const classes = useStyles();
  if (loading) return <div>loading</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className={classes.root}>
      <div className={classes.AuthStatus}>
        {(data.userInRole)
          ? <AuthStatusProfile userInRole={data.userInRole} /> : <AuthStatusLogin />}
      </div>
    </div>
  );
}
