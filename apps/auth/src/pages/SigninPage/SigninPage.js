import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  Link as RouterLink, useHistory, useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AuthStatusCode from '../../AuthStatusCode';
import AuthPage from '../../layout/AuthPage';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SIGN_IN = gql`
mutation SigninWithEmail($email: String!, $password: String!){
  signinWithEmail(email: $email, password: $password) {
    user{ firstname }
    token
    status {
      code
      msg
    }
  }
}
`;

export default function SignIn() {
  const history = useHistory();
  const query = useQuery();
  const classes = useStyles();
  const { t, ready } = useTranslation('Auth', { useSuspense: false });
  if (!ready) {
    return false;
  }

  const [inputError, setInputError] = useState(false);

  const [
    signinWithEmail,
    { loading, data, error },
  ] = useMutation(SIGN_IN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const signIn = (e) => {
    e.preventDefault();
    signinWithEmail({
      variables: {
        email,
        password,
      },
    });
  };

  useEffect(() => {
    if (!data) return;
    switch (data.signinWithEmail.status.code) {
      case AuthStatusCode.Success: // login success
        // redirect to redirecto query param or to home
        window.location.href = query.redirectto || '/';
        break;
      case AuthStatusCode.DuplicateSignin: // allready in
        window.location.href = '/';
        break;
      case AuthStatusCode.IncorrectPassword: // incorrect password
        setInputError(t('Error.IncorrectPassword'));
        break;
      case AuthStatusCode.UserNotFound: // user not found
        setInputError(t('Error.UserNotFound'));
        break;
      default:
        break;
    }
  }, [data, history]);

  return (
    <AuthPage error={error} loading={loading} className={classes.paper} maxWidth="xs">
      {inputError && (
      <Alert severity="warning">{inputError}</Alert>
      )}
      <form className={classes.form} onSubmit={signIn} noValidate>
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
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label={t('RememberInput.label')}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          {t('SigninButton.text')}
        </Button>
        <Grid container>
          <Grid item sm={12} md={6}>
            <Link component={RouterLink} to="/forgot-password" variant="body2">
              {t('ForgotPass.text')}
            </Link>
          </Grid>
          <Grid item sm={12} md={6}>
            <Link component={RouterLink} to="/signup" variant="body2">
              {t('NoAcc.text')}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthPage>
  );
}
