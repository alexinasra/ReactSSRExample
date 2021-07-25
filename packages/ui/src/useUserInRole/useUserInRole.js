import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

export default function useUserInRole() {
  const { data, loading, error } = useQuery(USER_INROLE_Q);
  return React.useMemo(() => {
    if (error || loading) {
      return null;
    }
    return data && data.userInRole;
  }, [data, loading, error]);
}
