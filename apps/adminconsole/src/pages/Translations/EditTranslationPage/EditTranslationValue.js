import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { UpdateI18nTranslationMutation } from '../../../schema.graphql';

export default function EditTranslationValue({
  autoFocus = false,
  required = false,
  translationNs,
  translationLanguage,
  translationKey,
  translationActualValue,
}) {
  const [value, setValue] = useState(translationActualValue || '');
  const { i18n, t } = useTranslation([], { useSuspense: false });
  const [updateTranslationValue] = useMutation(UpdateI18nTranslationMutation);

  const handleValueChange = (e) => setValue(e.target.value);

  const handleSave = (e) => {
    e.preventDefault();
    if (e.target.reportValidity()) {
      updateTranslationValue({
        variables: {
          input: {
            namespace: translationNs,
            key: translationKey,
            language: translationLanguage,
            value,
          },
        },
      }).catch(console.log);
    }
  };
  return (
    <form onSubmit={handleSave}>
      <Stack>
        <bdi dir={i18n.dir(translationLanguage)}>
          <TextareaAutosize
            style={{ width: '100%' }}
            autoFocus={autoFocus}
            required={required}
            value={value}
            onChange={handleValueChange}
            aria-label="empty textarea"
            placeholder="Empty"
            minRows={5}
          />
        </bdi>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: 4,
        }}
        >
          <Button sx={{ mx: 1 }} type="submit" color="success" variant="outlined">
            {t('Actions.confirm')}
          </Button>
          <Button sx={{ mx: 1 }} color="error" variant="outlined">
            {t('Actions.cancel')}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
