import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useQuery, useMutation, gql } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  inputText: {
    marginBottom: theme.spacing(3),
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  action: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const USER_PROFILE = gql`
query UserProfile {
  userInRole {
    id
    firstname
    lastname
  }
}
`;

const EDIT_USER_PROFILE = gql`
mutation EditUserProfile($userId: String!, $firstname: String!, $lastname: String!){
  editUserProfile(userId: $userId editForm:{firstname:$firstname, lastname:$lastname}){
    id
    firstname
    lastname
  }
}
`;

function EditForm({ user }) {
  const classes = useStyles();
  const { t, ready } = useTranslation('UserConsole', { useSuspense: false });
  const [firstname, setFirstname] = useState(user.firstname || '');
  const [lastname, setLastname] = useState(user.lastname || '');
  const [editUserProfile, { loading, error }] = useMutation(EDIT_USER_PROFILE);

  if (!ready) {
    return false;
  }

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const handleReload = () => {
    setFirstname(user.firstname || '');
    setLastname(user.lastname || '');
  };
  const handleSave = () => {
    editUserProfile({
      variables: {
        userId: user.id,
        firstname,
        lastname,
      },
    });
  };
  if (loading) return (<p>Loading</p>);
  if (error) return (<pre>{JSON.stringify(error, null, 2)}</pre>);
  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item md={12}>
          <TextField
            className={classes.inputText}
            fullWidth
            variant="outlined"
            value={firstname}
            onChange={handleFirstnameChange}
            label={t('userProfile.firstname')}
          />
          <TextField
            className={classes.inputText}
            fullWidth
            variant="outlined"
            value={lastname}
            onChange={handleLastnameChange}
            label={t('userProfile.lastname')}
          />
        </Grid>
        <Grid className={classes.actions} item md={12}>
          <Button
            className={classes.action}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            {t('userProfile.save')}
          </Button>
          <Button
            className={classes.action}
            variant="contained"
            onClick={handleReload}
          >
            {t('userProfile.reload')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default function EditProfile() {
  const { loading, error, data } = useQuery(USER_PROFILE);

  if (loading) {
    return (<p>Loading...</p>);
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, 2)}</pre>);
  }
  return (
    <EditForm user={data.userInRole} />
  );
}
