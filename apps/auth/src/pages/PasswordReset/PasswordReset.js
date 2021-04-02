import React, { useState, useMemo } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import AuthPage from '../../layout/AuthPage';

const useStyles = makeStyles(() => ({
  root: {},
}));

const CHANGE_PASSWORD = gql`
mutation ($password: String!) {
  changePassword(password: $password){
    status {
      code
    }
  }
}
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PasswordReset() {
  const classes = useStyles();
  const query = useQuery();
  const { t, ready } = useTranslation('foodle_auth', { useSuspense: false });
  if (!ready) {
    return false;
  }
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const enableButton = useMemo(
    () => (password && password === passwordConfirm),
    [password, passwordConfirm],
  );
  const handleButtonClick = async () => {
    await changePassword({ variables: { password } });
    window.location.href = query.redirectto || '/';
  };

  return (
    <AuthPage className={classes.root} loading={loading} error={error}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label={t('PasswordInput.label')}
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label={t('PasswordInput.label')}
        type="password"
        id="password"
        autoComplete="current-password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button
        disabled={!enableButton}
        onClick={handleButtonClick}
        variant="contained"
      >
        Change
      </Button>
    </AuthPage>
  );
}
