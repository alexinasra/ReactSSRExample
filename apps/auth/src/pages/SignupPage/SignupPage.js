import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { Link as RouterLink, useHistory } from 'react-router-dom';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AuthPage from '../../layout/AuthPage';
import AuthStatusCode from '../../AuthStatusCode';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const SIGN_UP = gql`
mutation ($firstname: String!, $lastname: String!, $email: String!, $password: String!){
  signup(
   signupForm: {
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
   error
 }
}
`;

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const { t, ready } = useTranslation('Auth', { useSuspense: false });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputError, setInputError] = useState(false);
  const [
    signup,
    { loading, data, error },
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
    });
  };
  useEffect(() => {
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
        window.location.href = '/';
    }
  }, [data, history]);
  if (!ready) {
    return false;
  }

  return (
    <AuthPage error={error} loading={loading} className={classes.paper} maxWidth="xs">
      {inputError && (
      <Alert severity="warning">{inputError}</Alert>
      )}
      <form className={classes.form} onSubmit={signUp} noValidate>
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
          className={classes.submit}
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
