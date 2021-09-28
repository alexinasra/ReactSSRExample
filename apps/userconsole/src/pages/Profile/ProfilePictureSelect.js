import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    alignItem: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    margin: (theme) => theme.spacing(2),
    height: (theme) => theme.spacing(8),
    width: (theme) => theme.spacing(8),
  },
};

const GALLERY = gql`
query {
  userInRole {
    id
    profilePicture
    profilePictures
  }
}
`;

const SET_PROFILE_PIC = gql`
mutation SetProfilePic($url: String!) {
  updateProfilePicture(url: $url) {
    id
    profilePicture
    profilePictures
  }
}
`;

function Item({ url }) {
  const [setProfilePic] = useMutation(SET_PROFILE_PIC);
  return (
    <Avatar
      sx={styles.item}
      src={url}
      onClick={() => setProfilePic({ variables: { url } })}
    />
  );
}

export default function ProfilePictureSelect() {
  const { loading, data } = useQuery(GALLERY);

  if (loading) {
    return (<p>Loaidng...</p>);
  }

  return (
    <Box sx={styles.root}>
      {
        data.userInRole.profilePictures.map((fileUrl) => (
          <Item key={fileUrl.replace('/', '_')} url={fileUrl} />))
      }
    </Box>
  );
}
