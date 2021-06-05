import React from 'react';
import Link from '@material-ui/core/Link';
import AuthReport from '../AuthReport';

export default function ForceLogin({ signinUrl, children }) {

  return (
    <AuthReport>
      {({userInRole}) => (
        userInRole ? children : (
          <Link href={signinUrl}>Signin</Link>
        )
      )}
    </AuthReport>
  )
}
