import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthReport from '@react-ssrex/ui/build/AuthReport';

import AuthContainer from './layout/AuthContainer';

import Home from './pages/Home';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import SignoutPage from './pages/SignoutPage';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <AuthReport>
      {({ userInRole }) => (
        <AuthContainer>
          <Switch>
            <Route path="/signup" exact>
              {userInRole ? <Redirect to="/" /> : <SignupPage />}
            </Route>
            <Route path="/signin" exact>
              {userInRole ? <Redirect to="/" /> : <SigninPage />}
            </Route>
            <Route path="/signout" exact>
              <SignoutPage />
            </Route>
            <Route path="/change-password" exact>
              <PasswordReset />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Redirect to="/signin" />
          </Switch>
        </AuthContainer>
      )}
    </AuthReport>
  );
}

export default App;
