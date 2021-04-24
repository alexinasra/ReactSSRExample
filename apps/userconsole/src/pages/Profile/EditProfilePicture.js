import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ProfilePictureDialog from './ProfilePictureDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(4),
  },
  avatar: {
    height: theme.spacing(24),
    width: theme.spacing(24),
    marginBottom: theme.spacing(2),
  },
}));

const GET_PROFILE_PIC = gql`
query ProfilePic {
  userInRole {
    id
    profilePicture
  }
}
`;

export default function EditProfilePicture() {
  const { t, ready } = useTranslation('UserConsole', { useSuspense: false });

  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PROFILE_PIC);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => setDialogOpen(false);
  const handleDialogOpen = () => setDialogOpen(true);

  if (!ready) {
    return false;
  }
  if (loading) {
    return (<p>Loading ...</p>);
  }
  if (error) {
    return (<pre>JSON.stringify(error, null ,2)</pre>);
  }
  const { profilePicture } = data.userInRole;

  return (
    <>
      <Paper className={classes.root}>
        <Avatar className={classes.avatar} src={profilePicture} />
        <Button variant="contained" onClick={handleDialogOpen}>{t('userProfile.changeProfilePic')}</Button>
      </Paper>
      <ProfilePictureDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
}
