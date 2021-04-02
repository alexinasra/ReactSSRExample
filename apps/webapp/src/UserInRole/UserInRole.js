import React from 'react';
import { useQuery, gql } from '@apollo/client';

const USER_IN_ROLE = gql`
query UserInRole {
  userInRole {
    id
    firstname
    lastname
    email
  }
}
`;

export default function UserInRole({ children }) {
  const { loading, error, data } = useQuery(USER_IN_ROLE);

  return (
    <div>
      {children(
        loading,
        error,
        data && data.userInRole,
      )}
    </div>
  );
}
