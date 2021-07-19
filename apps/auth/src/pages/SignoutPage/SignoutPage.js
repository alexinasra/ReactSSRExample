import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import AppLoading from '@react-ssrex/ui/build/AppLoading';

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
  ] = useMutation(SIGN_OUT);
  useEffect(() => {
    signout().then(() => {
      localStorage.clear();
      window.location.href = redirectTo;
    });
  }, [signout]);
  return (
    <AppLoading>Signing out ...</AppLoading>
  );
}
