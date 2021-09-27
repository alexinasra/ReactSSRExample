import React from 'react';
import { useTranslation } from 'react-i18next';

import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import PaperPage from '@react-ssrex/ui/build/DashboardLayout/LayoutPaperPage';
import LanguageSettings from './LanguageSettings';

export default function Settings() {
  const { t, ready } = useTranslation('UserConsole', { useSuspense: false });

  if (!ready) {
    return false;
  }

  return (
    <PaperPage
      title={t('mainNav.systemSettings')}
      subheader={t('settings.subheader')}
      avatar={(<Avatar><Icon>settings</Icon></Avatar>)}
    >
      <LanguageSettings />
    </PaperPage>
  );
}
