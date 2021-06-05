import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AppLoading from '../AppLoading';

const AUTH_REPORT = gql`
query {
  userInRole {
    id
    firstname
    lastname
    email
    profilePicture

    themeSettings {
      name,
      mode,
    }
  }
}
`;

export default function AuthReport ({ children }) {
  const { loading, error, data } = useQuery(AUTH_REPORT, {
    pollInterval: 500
  });
  if(loading) {
    return (<AppLoading />);
  }
  if(error) {
    return (<pre>{error}</pre>)
  }

  return children({ ...data });
}
