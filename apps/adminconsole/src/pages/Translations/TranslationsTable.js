import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TranslationValue from './TranslationValue';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  headingRow: {
  },
  languageTile: {
    textAlign: 'center',
  },
  bodyRow: {
  },
  keyCollumn: {
    width: theme.spacing(24),
  },
  actionCollumn: {
    width: theme.spacing(12),
  },
  flexGrow: {
    flexGrow: 1,
  },
  valueCollumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(46),
    '& > :first-child': {
      flexGrow: 1,
    },
  },
}));

const TRANSLATIONS_TABLE = gql`
query ($namespace: String) {
  languages {
    short
    long
    native
    dir
  }
  i18nTranslationKeys (namespace: $namespace) {
    id
    namespace
    key
  }
}
`;
const DROP_TRANSLATION = gql`
mutation ($input: DropI18nTranslationInput!){
  dropI18nTranslation(input: $input) {
    dropped
  }
}
`;
export default function TranslationsTable() {
  const classes = useStyles();
  const { namespace } = useParams();
  const [deleteKey, setDeleteKey] = React.useState(false);
  const [deleteTranslation] = useMutation(DROP_TRANSLATION);
  const {
    data,
    error,
    loading,
    refetch,
  } = useQuery(TRANSLATIONS_TABLE, {
    variables: { namespace },
    fetchPolicy: 'cache-and-network',
  });
  const { t } = useTranslation('Language', { useSuspense: false });

  if (loading) {
    return (
      <p>loading</p>
    );
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, '\n')}</pre>);
  }
  const handleDeleteTranslation = () => {
    deleteTranslation({
      variables: {
        input: {
          key: deleteKey.key,
          namespace: deleteKey.namespace,
        },
      },
    }).then(refetch).then(() => setDeleteKey(false));
  };

  return (
    <Paper className={classes.root}>
      <div
        className={clsx(classes.row, classes.headingRow)}
      >
        <div className={classes.keyCollumn}>
          {namespace}
        </div>
        <div className={clsx(classes.valueCollumn, classes.languageTile)}>
          {t('language_en')}
        </div>
        {data.languages.filter((l) => l.short !== 'en').map((l) => (
          <div key={l.short} className={clsx(classes.valueCollumn, classes.languageTile)}>
            {t(`language_${l.short}`)}
          </div>
        ))}
      </div>
      {
          data.i18nTranslationKeys.map((translationKey) => (
            <div key={translationKey.id} className={clsx(classes.row, classes.bodyRow)}>
              <div className={classes.keyCollumn}>
                {translationKey.key}
              </div>

              <div id={`${translationKey.id}_en`} className={classes.valueCollumn}>
                <TranslationValue
                  translationNs={translationKey.namespace}
                  translationKey={translationKey.key}
                  translationLanguage="en"
                >
                  {({ value }) => (
                    <bdi dir="ltr">
                      <Typography>
                        {value}
                      </Typography>
                    </bdi>
                  )}
                </TranslationValue>
              </div>
              {
                data.languages.filter((l) => l.short !== 'en').map((l) => (
                  <div
                    id={`${translationKey.id}_${l.short}`}
                    key={`${translationKey.id}_${l.short}`}
                    className={classes.valueCollumn}
                  >
                    <TranslationValue
                      translationNs={translationKey.namespace}
                      translationKey={translationKey.key}
                      translationLanguage={l.short}
                    >
                      {({ value }) => (
                        <bdi dir={l.dir}>
                          <Typography>
                            {value}
                          </Typography>
                        </bdi>
                      )}
                    </TranslationValue>
                  </div>
                ))
              }
              <div className={classes.actionCollumn}>
                <IconButton to={`/translations/${namespace}/edit/${encodeURIComponent(translationKey.key)}`} component={Link}>
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton onClick={() => setDeleteKey(translationKey)}>
                  <Icon>delete</Icon>
                </IconButton>
              </div>
            </div>
          ))
        }

      <Dialog open={!!deleteKey} onClose={() => setDeleteKey(false)}>
        <DialogTitle>Delete key ?</DialogTitle>
        <DialogContentText>
          {deleteKey && deleteKey.key}
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => setDeleteKey(false)} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDeleteTranslation} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
