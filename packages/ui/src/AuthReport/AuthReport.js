import React from 'react';
import AppLoading from '../AppLoading';
import useUserInRole from '../useUserInRole';


export default function AuthReport ({ children }) {
  const userInRole = useUserInRole();
  return children({ userInRole });
}
