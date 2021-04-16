import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import AuthPage from '../../layout/AuthPage';

function useRedirectTo() {
  const params = new URLSearchParams(useLocation().search);
  return params.redirecto || 'http://localhost:3030';
}

const SIGN_OUT = gql`
mutation Signinout{
  signout {
    error
  }
}
`;
export default function SignoutPage() {
  const redirectTo = useRedirectTo();

  const [
    signout,
    { error, loading },
  ] = useMutation(SIGN_OUT);
  useEffect(() => {
    signout().then(() => {
      window.location.href = redirectTo;
    });
  }, [signout]);
  return (
    <AuthPage error={error} loading={loading}>Signing out ...</AuthPage>
  );
}
