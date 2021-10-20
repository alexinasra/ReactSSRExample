import React from 'react';
import { useQuery, DocumentNode } from '@apollo/client';
import AppLoading from '../AppLoading';
// @ts-ignore
import { UserInRoleQuery } from '../schema.graphql'

type AuthReportData = {
  userInRole: {
    id: string,
    firstname: string,
    lastname: string,
    profilePicture: string,
    email: string,
    activated: boolean,
    preferedLanguage: string
  }
}

type authReportProps = {
  children: (data: AuthReportData) => React.ReactNode
}

export default function AuthReport ({ children }: authReportProps) {
  const { data, loading, error } = useQuery<AuthReportData>(UserInRoleQuery);
  if(loading) {
    return (<AppLoading />)
  }
  if(error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }

  return (<>{children(data)}</>);
}
