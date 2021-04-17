import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import PaperPage from '../../layout/pagetypes/PaperPage';
import LanguageSettings from './LanguageSettings';

export default function Settings() {
  return (
    <PaperPage
      title="Settings"
      subheader="change settings and preferences."
      avatar={(<Avatar><Icon>settings</Icon></Avatar>)}
    >
      <LanguageSettings />
    </PaperPage>
  );
}
