import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import TableRowsIcon from '@mui/icons-material/TableRows';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light'
    ? theme.palette.grey[100]
    : theme.palette.grey[800];
  return {
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function EditBreadcrumbs({ namespace, tkey }) {
  const { t, ready } = useTranslation();

  return (
    <Breadcrumbs>
      <StyledBreadcrumb
        component={RouterLink}
        to="/"
        label={ready ? t('AdminConsole:MainNav.dashboard') : 'Dashboard'}
        icon={<HomeIcon fontSize="small" />}
      />
      <StyledBreadcrumb
        component={RouterLink}
        to={`/translations/${namespace}`}
        label={namespace}
        icon={<TableRowsIcon fontSize="small" />}
      />
      <StyledBreadcrumb
        label={tkey}
        icon={<VpnKeyIcon fontSize="small" />}
      />
    </Breadcrumbs>
  );
}
