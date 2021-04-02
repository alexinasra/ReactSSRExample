import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Page from '../../layout/Page';
import LanguageSettings from './LanguageSettings';

const useStyles = makeStyles(() => ({
  root: {},
}));

export default function Settings() {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <LanguageSettings />
    </Page>
  );
}
