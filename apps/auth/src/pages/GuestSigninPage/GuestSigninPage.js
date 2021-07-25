import React from 'react';
import { useMutation, gql } from '@apollo/client';
import AuthPage from '../../layout/AuthPage';

const GUEST_SIGNIN_M = gql`
mutation {
  guestSignin {
    token
  }
}
`;

export default function GuestSigninPage() {
  const [signin] = useMutation(GUEST_SIGNIN_M);

  React.useEffect(() => {
    signin().then(({ data }) => {
      localStorage.setItem('token', data.guestSignin.token);
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    });
  }, []);
  return <AuthPage />;
}
