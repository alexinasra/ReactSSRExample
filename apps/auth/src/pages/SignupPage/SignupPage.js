import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { Link as RouterLink } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import AuthPage from '../../layout/AuthPage';
import AuthStatusCode from '../../AuthStatusCode';

const styles = {
  paper: {
    marginTop: (theme) => theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: (theme) => theme.spacing(3),
  },
  submit: {
    margin: (theme) => theme.spacing(3, 0, 2),
  },
};
const SIGN_UP = gql`
mutation ($firstname: String!, $lastname: String!, $email: String!, $password: String!){
  signup(
   input: {
     password: $password
     email: $email
     firstname: $firstname
     lastname: $lastname
   }
 ) {
   user {
     id
     firstname
     lastname
   }
   token
   error
 }
}
`;

export default function SignUp() {
  const { t } = useTranslation('Auth', { useSuspense: false });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState(false);
  const [
    signup,
  ] = useMutation(SIGN_UP);

  const signUp = (e) => {
    e.preventDefault();
    signup({
      variables: {
        firstname,
        lastname,
        email,
        password,

      },
    }).then(({ data }) => {
      if (!data) return;
      switch (data.signup.error) {
        case AuthStatusCode.DuplicateSignin: // allready in
          window.location.href = '/';
          break;
        case AuthStatusCode.IncorrectPassword: // incorrect password
          setInputError('Bad Password');
          break;
        case AuthStatusCode.UserNotFound: // user not found
          setInputError('User Not Found');
          break;
        default:
          console.log(data);
          localStorage.setItem('token', data.signup.token);
          window.location.href = '/';
      }
    });
  };

  return (
    <AuthPage sx={styles.paper} maxWidth="xs">
      {inputError && (
      <Alert severity="warning">{inputError}</Alert>
      )}
      <form sx={styles.form} onSubmit={signUp} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>

            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label={t('FirstnameInput.label')}
              autoFocus
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />

          </Grid>
          <Grid item xs={12} sm={6}>

            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label={t('LastnameInput.label')}
              name="lastName"
              autoComplete="lname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />

          </Grid>
          <Grid item xs={12}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('EmailInput.label')}
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </Grid>
          <Grid item xs={12}>

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

          </Grid>
          <Grid item xs={12}>

            <FormControlLabel
              value={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label={t('AcceptTermInput.label')}
            />

          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!acceptTerms}
          sx={styles.submit}
        >
          {t('SignupButton.text')}
        </Button>

        <Grid container>
          <Grid item sm={12}>

            <Link component={RouterLink} to="/signin" variant="body2">
              {t('HaveAcc.text')}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthPage>
  );
}
