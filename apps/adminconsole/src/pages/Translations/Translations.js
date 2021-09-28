/* eslint-disable no-tabs */
import React from 'react';
import {
  useParams,
  Switch,
  Route,
} from 'react-router-dom';

import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutBasePage';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import EditTranslationPage from './EditTranslationPage';
import TranslationsTable from './TranslationsTable';
import SelectNamespace from './SelectNamespace';
import AddNamespace from './AddNamespace';
import RemoveNamespace from './RemoveNamespace';
import AddKey from './AddKey';

export default function Translations() {
  const { namespace } = useParams();

  return (
    <LayoutPage decorate>
      <Switch>
        <Route path="/translations/:namespace" exact>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <Paper sx={{
                display: 'flex',
                alignItems: 'center',
                padding: (theme) => `${theme.spacing(2)}px ${theme.spacing(6)}px`,
              }}
              >
                <div>
                  <AddKey />
                </div>
                <div style={{ flexGrow: 1 }} />
                <div>
                  <SelectNamespace />
                </div>
                <div>
                  <AddNamespace />
                </div>
                <div>
                  <RemoveNamespace namespace={namespace} />
                </div>
              </Paper>
            </Grid>
            <Grid item sm={12}>
              <TranslationsTable />
            </Grid>
          </Grid>
        </Route>
        <Route path="/translations/:namespace/edit/:key" exact>
          <EditTranslationPage />
        </Route>
      </Switch>

    </LayoutPage>
  );
}
