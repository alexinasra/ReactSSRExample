import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useMutation, gql } from '@apollo/client';
import { CreateI18nTranslationMutation } from '../../schema.graphql';

export default function AddKey() {
  const { t } = useTranslation('AdminConsole', { useSuspense: false });
  const { push } = useHistory();
  const { namespace } = useParams();

  const [createKey] = useMutation(CreateI18nTranslationMutation, {
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
