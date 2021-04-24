import React from 'react';
import { useTranslation } from 'react-i18next';

import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import PaperPage from '../../layout/pagetypes/PaperPage';
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
