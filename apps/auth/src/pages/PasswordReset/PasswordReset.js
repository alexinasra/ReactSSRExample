import React, { useState, useMemo } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import AuthPage from '../../layout/AuthPage';

const CHANGE_PASSWORD = gql`
mutation ($password: String! $newPassword: String!) {
  changePassword(input: {
      oldPassword: $password
      newPassword: $newPassword
    }){
    error
  }
}
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PasswordReset() {
  const query = useQuery();
  const { t, ready } = useTranslation('Auth', { useSuspense: false });
  if (!ready) {
    return false;
  }
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const enableButton = useMemo(
    () => (password && newPassword && newPassword === passwordConfirm),
    [password, newPassword, passwordConfirm],
  );
  const handleButtonClick = async () => {
    await changePassword({ variables: { password, newPassword } });
    window.location.href = query.redirectto || '/';
  };

  return (
    <AuthPage loading={loading} error={error}>
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
        name="new-password"
        label={t('PasswordInput.label')}
        type="password"
        id="new-password"
        autoComplete="current-password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="renew-password"
        label={t('PasswordInput.label')}
        type="password"
        id="renew-password"
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
