import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import { DropI18nTranslationMutation } from '../../schema.graphql';

export default function DeleteKeyDialog({
  translationKey,
  onCancel = () => {},
  onConfirm = () => {},
  onError = () => {},
}) {
  const [deleteTranslation] = useMutation(DropI18nTranslationMutation, {
    refetchQueries: ['TranslationsTableQuery'],
  });

  const handleDeleteTranslation = () => {
    deleteTranslation({
      variables: {
        input: {
          key: translationKey.key,
          namespace: translationKey.namespace,
        },
      },
    }).then(({ data }) => {
      if (data.dropI18nTranslation.error) {
        return onError(data.dropI18nTranslation.error);
      }

      return onConfirm(data.dropI18nTranslation);
    }).catch((e) => onError(e.message));
  };

  return (
    <Dialog open={!!translationKey} onClose={onCancel}>
      <DialogTitle>Delete key ?</DialogTitle>
      <DialogContentText>
        {translationKey && translationKey.key}
      </DialogContentText>
      <DialogActions>
        <Button onClick={onCancel} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDeleteTranslation} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
