import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';

import LayoutContainer from '@react-ssrex/ui/build/WebappLayout/LayoutContainer';
import HomePage from './pages/HomePage';
import CreatePoll from './pages/Poll/CreatePoll';
import ViewPoll from './pages/Poll/ViewPoll';
import { PageNotFound } from './pages/ErrorPage';

export default function App() {
  return (
    <LayoutContainer>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/poll/view-:pollId" exact>
          <ViewPoll />
        </Route>
        <Route path="/poll/create" exact>
          <CreatePoll />
        </Route>
        <Route path="/404">
          <PageNotFound />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </LayoutContainer>
  );
}
