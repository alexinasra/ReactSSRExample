import React, { useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { gql, useMutation } from '@apollo/client';

const DROP_NS = gql`
mutation ($namespace: String!) {
  dropI18nNamespace(namespace: $namespace) {
    dropped
    namespace
  }
}
`;

export default function RemoveNamespace({
  namespace,
}) {
  const { t } = useTranslation('AdminConsole', { useSuspense: false });
  const [open, setOpen] = useState(false);
  const [dropNamespace] = useMutation(DROP_NS, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          i18nNamespaces(existing = []) {
            if (data.dropI18nNamespace.dropped) {
              return existing.filter((e) => e !== namespace);
            }
            return existing;
          },
        },
      });
    },
  });
  const { push } = useHistory();

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddClick = () => {
    dropNamespace({
      variables: {
        namespace,
      },
    }).then(() => push('/translations'));
    handleClose();
  };
  return (
    <>
      <Tooltip title={t('Translations.removeNamespace')}>
        <span>
          <IconButton disabled={namespace === 'common'} onClick={() => setOpen(true)}>
            <Icon>remove</Icon>
          </IconButton>
        </span>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {t('Translations.removeAlert', { namespace })}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t('Translations.cancelAction')}
          </Button>
          <Button onClick={handleAddClick} color="primary">
            {t('Translations.confirmAction')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
