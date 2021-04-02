/* eslint-disable react/prop-types */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppLoading from '@foodle/ui/build/AppLoading';
import AppContainer from './layout/AppContainer';

import ForceLogin from './ForceLogin';
import HomePage from './pages/HomePage';
import CreateWizard from './pages/CreateWizard';

const USER_INROLE = gql`
query {
  userInRole {
    id
    ownsRestaurant
  }
}
`;

export default function App() {
  const { loading, error, data } = useQuery(USER_INROLE);
  if (loading) {
    return <AppLoading />;
  }

  if (error) {
    return (
      <div>
        {JSON.stringify(error, undefined, '\t')}
      </div>
    );
  }

  return (
    <ForceLogin>
      <CssBaseline />
      {data.userInRole && data.userInRole.ownsRestaurant ? (
        <AppContainer>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </AppContainer>
      ) : (
        <CreateWizard />
      )}
    </ForceLogin>
  );
}
