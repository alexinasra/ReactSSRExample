/* eslint-disable react/prop-types */
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardContainer from './layout/DashboardContainer';

import HomePage from './pages/HomePage';
import LanguageLocalePage, {
  LanguagesPage,
  TranslationsPage,
} from './pages/LanguageLocalePage';

export default function App() {
  return (
    <DashboardContainer
      logo={(
        <Link to="/">
          <img height="44" src="/assets/logo.png" alt="lookfor.ae" />
        </Link>
      )}
      toolbar={(
        <Toolbar>
          Item
        </Toolbar>
      )}
      aside={(
        <div>
          <Link to="/locale-settings">Language and Localization</Link>
        </div>
      )}
    >
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
    </DashboardContainer>
  );
}
