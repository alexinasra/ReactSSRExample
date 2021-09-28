import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TranslationValue from './TranslationValue';

const styles = {
  root: {
    padding: (theme) => theme.spacing(2),
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
    width: (theme) => theme.spacing(24),
  },
  actionCollumn: {
    width: (theme) => theme.spacing(12),
  },
  flexGrow: {
    flexGrow: 1,
  },
  valueCollumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: (theme) => theme.spacing(46),
    '& > :first-of-type': {
      flexGrow: 1,
    },
  },
};

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
    <Paper sx={styles.root}>
      <Box
        sx={{ ...styles.row, ...styles.headingRow }}
      >
        <Box sx={styles.keyCollumn}>
          {namespace}
        </Box>
        <Box sx={{ ...styles.valueCollumn, ...styles.languageTile }}>
          {t('language_en')}
        </Box>
        {data.languages.filter((l) => l.short !== 'en').map((l) => (
          <Box key={l.short} sx={{ ...styles.valueCollumn, ...styles.languageTile }}>
            {t(`language_${l.short}`)}
          </Box>
        ))}
      </Box>
      {
          data.i18nTranslationKeys.map((translationKey) => (
            <Box key={translationKey.id} sx={{ ...styles.row, ...styles.bodyRow }}>
              <Box sx={styles.keyCollumn}>
                {translationKey.key}
              </Box>

              <Box id={`${translationKey.id}_en`} sx={styles.valueCollumn}>
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
              </Box>
              {
                data.languages.filter((l) => l.short !== 'en').map((l) => (
                  <Box
                    id={`${translationKey.id}_${l.short}`}
                    key={`${translationKey.id}_${l.short}`}
                    sx={styles.valueCollumn}
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
                  </Box>
                ))
              }
              <Box sx={styles.actionCollumn}>
                <IconButton to={`/translations/${namespace}/edit/${encodeURIComponent(translationKey.key)}`} component={Link}>
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton onClick={() => setDeleteKey(translationKey)}>
                  <Icon>delete</Icon>
                </IconButton>
              </Box>
            </Box>
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
