import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import LayoutContainer from '@react-ssrex/ui/build/WebappLayout/LayoutContainer';
import LayoutAppBar from '@react-ssrex/ui/build/WebappLayout/LayoutAppBar';

import HomePage from './pages/HomePage';
import { PageNotFound } from './pages/ErrorPage';

function App() {
  return (
    <LayoutContainer>
      <LayoutAppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
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

export default App;
