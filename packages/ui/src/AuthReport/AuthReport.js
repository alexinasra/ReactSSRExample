import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AppLoading from '../AppLoading';

const USER_INROLE_Q = gql`
query {
  userInRole {
    id
    firstname
    lastname
    email
    profilePicture
  }
}
`;
export default function AuthReport ({ children }) {
  const { data, loading, error } = useQuery(USER_INROLE_Q);
  if(loading) {
    return (<AppLoading />)
  }
  if(error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }
  const userInRole = data.userInRole;
  return children({ userInRole });
}
