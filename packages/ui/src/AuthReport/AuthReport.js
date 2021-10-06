import React from 'react';
import { useQuery } from '@apollo/client';
import AppLoading from '../AppLoading';
import { UserInRoleQuery } from '../schema.graphql'

export default function AuthReport ({ children }) {
  const { data, loading, error } = useQuery(UserInRoleQuery);
  if(loading) {
    return (<AppLoading />)
  }
  if(error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }
  const userInRole = data.userInRole;
  return children({ userInRole });
}
