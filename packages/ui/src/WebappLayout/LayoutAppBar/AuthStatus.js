import React from 'react';
import Suspense from '@react-ssrex/ui/build/Suspense';
import { Translation } from 'react-i18next';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AuthReport from '../../AuthReport';

const useStyles = makeStyles(() => ({
  root: {},
}));

export default function AuthStatus() {
  const classes = useStyles();

  return (
    <AuthReport>
      {({ userInRole }) => (
        <div className={classes.root}>
          <div className={classes.AuthStatus}>
            {(userInRole)
              ? (
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
              ) : (
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
              )}
          </div>
        </div>
      )}
    </AuthReport>
  );
}
