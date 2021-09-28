import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ProfilePictureDialog from './ProfilePictureDialog';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: (theme) => theme.spacing(4),
    marginRight: (theme) => theme.spacing(4),
    padding: (theme) => theme.spacing(4),
  },
  avatar: {
    height: (theme) => theme.spacing(24),
    width: (theme) => theme.spacing(24),
    marginBottom: (theme) => theme.spacing(2),
  },
};

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
      <Paper sx={styles.root}>
        <Avatar sx={styles.avatar} src={profilePicture} />
        <Button variant="contained" onClick={handleDialogOpen}>{t('userProfile.changeProfilePic')}</Button>
      </Paper>
      <ProfilePictureDialog open={dialogOpen} onClose={handleDialogClose} />
    </>
  );
}
