/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LayoutContainer from './layout/LayoutContainer';

import HomePage from './pages/HomePage';
import LanguageLocalePage, {
  LanguagesPage,
  TranslationsPage,
} from './pages/LanguageLocalePage';

export default function App() {
  return (
    <LayoutContainer>
      <Switch>
        <Route path="/locale-settings/languages" exact>
          <LanguagesPage />
        </Route>
        <Route path="/locale-settings/translations" exact>
          <TranslationsPage />
        </Route>
        <Route path="/locale-settings" exact>
          <LanguageLocalePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </LayoutContainer>
  );
}
