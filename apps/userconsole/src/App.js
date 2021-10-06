/* eslint-disable react/prop-types */
import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import InitTheme from './InitTheme';
import InitLayout from './InitLayout';

export default function App() {
  return (
    <InitTheme>
      <InitLayout>
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
      </InitLayout>
    </InitTheme>
  );
}
