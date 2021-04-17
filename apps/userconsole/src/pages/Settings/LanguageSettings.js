import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {},
  link: { margin: `auto ${theme.spacing(1)}px ` },
  langButton: {
    background: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[600],
  },
  selectedLanguage: {
    background: theme.palette.success[theme.palette.type],
  },
}));

const PREFERED_LANG = gql`
query {
  userInRole {
    id,
    preferedLanguage
  }
}
`;

const SET_PREFERED_LANG = gql`
mutation ($lng: String!) {
  setPreferedLanguage(lng: $lng){
    id,
    preferedLanguage
  }
}
`;

export default function LanguageSettings() {
  const classes = useStyles();
  const { i18n, t, ready } = useTranslation(null, { useSuspense: false });
  const { data, loading, error } = useQuery(PREFERED_LANG);
  const [setPreferedLanguage] = useMutation(SET_PREFERED_LANG);
  const systemLanguages = useMemo(() => (i18n.options.languages || []), [i18n]);

  if (!ready || loading) {
    return (<div>Loading</div>);
  }

  if (error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }

  const handleLanguageChange = (lng) => async () => {
    const resp = await setPreferedLanguage({ variables: { lng } });
    await i18n.changeLanguage(resp.data.setPreferedLanguage.preferedLanguage);
    document.body.direction = i18n.dir(resp.data.setPreferedLanguage.preferedLanguage);
    document.documentElement.lang = lng;
    document.documentElement.direction = i18n.dir(resp.data.preferedLanguage);
  };

  return (
    <Box className={classes.root}>
      <ButtonGroup>
        {systemLanguages.map((lng) => (
          <Button
            className={
              clsx(
                classes.langButton,
                {
                  [classes.selectedLanguage]: lng === data.userInRole.preferedLanguage,
                },
              )
            }
            onClick={handleLanguageChange(lng)}
            key={lng}
          >
            {t(`Language:language_${lng}`)}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
