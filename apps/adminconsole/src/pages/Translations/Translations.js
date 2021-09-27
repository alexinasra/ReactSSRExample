/* eslint-disable no-tabs */
import React from 'react';
import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,

  },
  flexGrow: {
    flexGrow: 1,
  },
  table: {
  },
}));

export default function Translations() {
  const classes = useStyles();
  const { namespace } = useParams();

  return (
    <LayoutPage className={classes.root} decorate>
      <Switch>
        <Route path="/translations/:namespace" exact>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <Paper className={classes.toolbar}>
                <div>
                  <AddKey />
                </div>
                <div className={classes.flexGrow} />
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
            <Grid className={classes.table} item sm={12}>
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
