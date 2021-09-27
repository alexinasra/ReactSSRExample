import React, { useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import { gql, useMutation } from '@apollo/client';

const CREATE_NS = gql`
mutation ($namespace: String!) {
  createI18nNamespace(namespace: $namespace) {
    created
  }
}
`;

export default function AddNamespace() {
  const { t } = useTranslation('AdminConsole', { useSuspense: false });
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [createNamespace] = useMutation(CREATE_NS, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          i18nNamespaces(existing = []) {
            if (data.createI18nNamespace.created) {
              return [...existing, value];
            }
            return existing;
          },
        },
      });
    },
  });
  const { push } = useHistory();

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleClose = () => {
    setValue('');
    setOpen(false);
  };
  const handleAddClick = () => {
    createNamespace({
      variables: {
        namespace: value,
      },
    }).then(() => push(`/translations/${value}`));
    handleClose();
  };
  return (
    <>
      <Tooltip title={t('Translations.addNamespace')}>
        <IconButton onClick={() => setOpen(true)}>
          <Icon>add</Icon>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <CardContent>
          <TextField
            label={t('Translations.namespace')}
            value={value}
            onChange={handleChangeValue}
            fullWidth
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            {t('Translations.cancelAction')}
          </Button>
          <Button
            color="primary"
            disabled={!value}
            onClick={handleAddClick}
          >
            {t('Translations.confirmAction')}
          </Button>
        </CardActions>
      </Dialog>
    </>
  );
}
