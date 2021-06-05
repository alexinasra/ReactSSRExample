import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from '@material-ui/core/Link';

const AUTH_REPORT = gql`
query AuthReport {
  userInRole {
    id
  }
}
`;

export default function ForceLogin({ children }) {
  const { loading, error, data } = useQuery(AUTH_REPORT, {
    pollInterval: 500
  });

  if (loading) {
    return (<div>Loading</div>);
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, 2)}</pre>);
  }
  if (!data || !data.userInRole) {
    return (<Link href="/auth/signin?redirectto=/userconsole">Signin</Link>);
  }

  return (<>{children}</>);
}
