import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  Link as RouterLink,
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

const SIGN_IN = gql`
mutation SigninWithEmail($email: String!, $password: String!){
  signin(input: {
      email: $email
      password: $password
    }) {
    user{
      id
      firstname
    }
    token
    error
  }
}
`;

export default function SignIn() {
  // const query = useQuery();
  const classes = useStyles();
  const { t } = useTranslation('Auth', { useSuspense: false });
  const [inputError, setInputError] = useState(false);

  const [
    signin,
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
    signin({
      variables: {
        email,
        password,
      },
    }).then(({ data }) => {
      if (!data) return;
      switch (data.signin.error) {
        case AuthStatusCode.DuplicateSignin: // allready in
          window.location.href = '/';
          break;
        case AuthStatusCode.IncorrectPassword: // incorrect password
          setInputError(t('Error.IncorrectPassword'));
          break;
        case AuthStatusCode.UserNotFound: // user not found
          setInputError(t('Error.UserNotFound'));
          break;
        default: {
          localStorage.setItem('token', data.signin.token);
          window.location.href = '/';
        }
      }
    });
  };

  return (
    <AuthPage className={classes.paper} maxWidth="xs">
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
