/* eslint-disable no-tabs */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Switch, Route,
  useParams,
  useHistory,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useMutation, gql } from '@apollo/client';
import LayoutPage from '@react-ssrex/ui/build/DashboardLayout/LayoutBasePage';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import EditTranslationPage from './EditTranslationPage';
import TranslationsTable from './TranslationsTable';
import SelectNamespace from './SelectNamespace';
import AddNamespace from './AddNamespace';
import RemoveNamespace from './RemoveNamespace';

const CREATE_KEY = gql`
mutation ($input: CreateI18nTranslationInput) {
  createI18nTranslation(input: $input) {
    created
    translationKey {
      id
      namespace
      key
    }
  }
}
`;

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
  const { t } = useTranslation('AdminConsole', { useSuspense: false });
  const classes = useStyles();
  const { push } = useHistory();
  const { namespace } = useParams();
  const [createKey] = useMutation(CREATE_KEY, {
    update(cache, { data: { createI18nTranslation } }) {
      cache.modify({
        fields: {
          i18nTranslationKeys(existingKeys = []) {
            if (createI18nTranslation.translationKey.namespace === namespace) {
              const translationKeyRef = cache.writeFragment({
                data: createI18nTranslation.translationKey,
                fragment: gql`
                  fragment NewTranslationKey on I18nTranslationKey {
                    id
                    namespace
                    key
                  }
                `,
              });
              return [...existingKeys, translationKeyRef];
            }
            return existingKeys;
          },
        },
      });
    },
  });
  const [newKeyOpen, setNewKeyOpen] = React.useState(false);
  const [newKeyText, setNewKeyText] = React.useState('');

  const handleDialogOpen = () => {
    setNewKeyText('');
    setNewKeyOpen(true);
  };
  const handleDialogClose = () => {
    setNewKeyText('');
    setNewKeyOpen(false);
  };
  const handleDialogConfirm = () => {
    createKey({
      variables: {
        input: {
          namespace,
          key: newKeyText,
        },
      },
    })
      .then(handleDialogClose)
      .then(() => push(`/translations/${namespace}/edit/${newKeyText}`));
  };
  const handleKeyChange = (e) => {
    setNewKeyText(e.target.value);
  };

  return (
    <LayoutPage className={classes.root} decorate>
      <Switch>
        <Route path="/translations/:namespace" exact>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <Paper className={classes.toolbar}>
                <div>
                  <Button onClick={handleDialogOpen}>
                    {t('Translations.newKey')}
                  </Button>
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
          <Dialog open={newKeyOpen} onClose={handleDialogClose}>
            <DialogContent>
              <TextField value={newKeyText} onChange={handleKeyChange} autoFocus />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                {t('Translations.cancelAction')}
              </Button>
              <Button onClick={handleDialogConfirm} color="primary">
                {t('Translations.confirmAction')}
              </Button>
            </DialogActions>
          </Dialog>
        </Route>
        <Route path="/translations/:namespace/edit/:key" exact>
          <EditTranslationPage />
        </Route>
      </Switch>

    </LayoutPage>
  );
}
