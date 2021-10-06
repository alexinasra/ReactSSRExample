/* eslint-disable react/prop-types */
import React from 'react';
import {
  Switch, Route, Redirect,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Translations from './pages/Translations';
import Users from './pages/Users';
import Polls from './pages/Polls';
import SystemNotifications from './pages/SystemNotifications';

import InitTheme from './InitTheme';
import InitLayout from './InitLayout';

export default function App() {
  return (
    <InitTheme>
      <InitLayout>
        <Switch>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/system-notifications" exact>
            <SystemNotifications />
          </Route>
          <Route path="/translations" exact>
            <Redirect to="/translations/common" />
          </Route>
          <Route path="/translations/:namespace">
            <Translations />
          </Route>
          <Route path="/polls" exact>
            <Polls />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </InitLayout>
    </InitTheme>
  );
}
