/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LayoutContainer from './layout/LayoutContainer';

import ForceLogin from './ForceLogin';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ForceLogin>
      <LayoutContainer>
        <Switch>
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
      </LayoutContainer>
    </ForceLogin>
  );
}
