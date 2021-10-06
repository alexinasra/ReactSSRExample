/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React from 'react';
import serverRender from '@react-ssrex/ui/build/serverRender';
import App from './App';

export default function serverRenderer({ clientStats, serverStats }) {
  return serverRender('/auth', 'auth', App);
}
