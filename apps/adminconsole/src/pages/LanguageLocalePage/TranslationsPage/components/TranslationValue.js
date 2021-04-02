import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Translation } from 'react-i18next';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';
import Refresh from '@material-ui/icons/Refresh';
import amber from '@material-ui/core/colors/amber';

const TRANSLATE_Q = gql`
query ($key: String! $ns: String! $lng: String!) {
  translate(key: $key options: { ns: $ns lng: $lng })
}
`;
const TRANSLATE_M = gql`
mutation ($key: String! $ns: String! $value: String! $lng: String!) {
  i18nSetTranslation(key: $key ns: $ns value: $value lng: $lng)
}
`;
const TRANSLATE_C = gql`
mutation ($key: String! $ns: String! $lng: String!) {
  i18nClearTranslation(key: $key ns: $ns lng: $lng)
}
`;

const useStyles = makeStyles({
  isDirty: {
    background: amber[100],
  },
});
export default function TranslationValue({ tkey, ns, lng }) {
  const {
    loading, error, data, refetch,
  } = useQuery(TRANSLATE_Q, {
    variables: {
      key: tkey,
      ns,
      lng,
    },
  });
  const [setTranslation] = useMutation(TRANSLATE_M);
  const [clearTranslation] = useMutation(TRANSLATE_C);

  const [state, setState] = useState({
    value: '',
    dirty: false,
  });

  useEffect(() => {
    if (!loading && data) {
      setState({
        value: data.translate,
        dirty: false,
      });
    }
  }, [loading, data]);
  const classes = useStyles();
  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value !== data.translate) {
      setState({ value, dirty: true });
    } else {
      setState({ dirty: false });
    }
  };

  const handleSaveButtonClick = async () => {
    await setTranslation({
      variables: {
        key: tkey,
        ns,
        lng,
        value: state.value,
      },
    });
    await refetch();
  };
  const handleClearButtonClick = async () => {
    await clearTranslation({
      variables: {
        key: tkey,
        ns,
        lng,
      },
    });
    await refetch();
  };
  const handleRefreshButtonClick = () => {
    setState({
      value: data.translate,
      dirty: false,
    });
  };
  if (error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }
  return (
    <Translation>
      {
        (t) => (
          <bdo dir={t('Language:text_direction', { lng })}>
            <Input
              id={`${ns}_${tkey}_${lng}`}
              value={state.value}
              onChange={handleInputChange}
              multiline
              fullWidth
              className={clsx({ [classes.isDirty]: state.dirty })}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    disabled={!state.dirty}
                    onClick={handleSaveButtonClick}
                  >
                    <Save />
                  </IconButton>
                  <IconButton
                    onClick={handleRefreshButtonClick}
                  >
                    <Refresh />
                  </IconButton>
                  <IconButton
                    onClick={handleClearButtonClick}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              )}
            />
          </bdo>
        )
      }
    </Translation>

  );
}
