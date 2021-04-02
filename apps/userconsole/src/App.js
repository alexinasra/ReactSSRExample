/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppContainer from './layout/AppContainer';

import ForceLogin from './ForceLogin';
import HomePage from './pages/HomePage';
import EnableBusiness from './pages/EnableBusiness';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ForceLogin>
      <CssBaseline />
      <AppContainer>
        <Switch>
          <Route path="/enable-business" exact>
            <EnableBusiness />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </AppContainer>
    </ForceLogin>
  );
}
