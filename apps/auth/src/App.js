import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthContainer from './layout/AuthContainer';

import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import SignoutPage from './pages/SignoutPage';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <AuthContainer>
      <Switch>
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/signin" exact>
          <SigninPage />
        </Route>
        <Route path="/signout" exact>
          <SignoutPage />
        </Route>
        <Route path="/change-password" exact>
          <PasswordReset />
        </Route>
        <Redirect to="/signin" />
      </Switch>
    </AuthContainer>
  );
}

export default App;
