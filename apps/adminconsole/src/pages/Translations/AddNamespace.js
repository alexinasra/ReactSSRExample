import React, { useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
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
          <Button disabled={!value} onClick={handleAddClick}>{t('Translations.confirmAction')}</Button>
          <Button onClick={handleClose}>{t('Translations.cancelAction')}</Button>
        </CardActions>
      </Dialog>
    </>
  );
}
