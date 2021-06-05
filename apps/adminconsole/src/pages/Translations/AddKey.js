import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useMutation, gql } from '@apollo/client';

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

export default function AddKey() {
  const { t } = useTranslation('AdminConsole', { useSuspense: false });
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

  const [value, setValue] = useState(false);
  const handleDialogOpen = () => {
    setValue('');
  };
  const handleDialogClose = () => {
    setValue(false);
  };
  const handleDialogConfirm = () => {
    createKey({
      variables: {
        input: {
          namespace,
          key: value,
        },
      },
    })
      .then(handleDialogClose)
      .then(() => push(`/translations/${namespace}/edit/${value}`));
  };
  const handleKeyChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Tooltip title={t('Translations.newKeyTooltip')}>
        <Button onClick={handleDialogOpen}>
          {t('Translations.newKey')}
        </Button>
      </Tooltip>
      <Dialog open={value !== false} onClose={handleDialogClose}>
        <DialogContent>
          <TextField
            label={t('Translations.newKey')}
            value={value}
            onChange={handleKeyChange}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            {t('Translations.cancelAction')}
          </Button>
          <Button
            disabled={!value}
            onClick={handleDialogConfirm}
            color="primary"
          >
            {t('Translations.confirmAction')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
