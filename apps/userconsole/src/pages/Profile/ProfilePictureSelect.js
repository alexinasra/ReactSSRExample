import React from 'react';
import { makeStyles } from '@mui/styles';
import { useQuery, useMutation, gql } from '@apollo/client';

import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    alignItem: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    margin: theme.spacing(2),
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
}));

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

function Item({ url, className }) {
  const [setProfilePic] = useMutation(SET_PROFILE_PIC);
  return (
    <Avatar
      className={className}
      src={url}
      onClick={() => setProfilePic({ variables: { url } })}
    />
  );
}

export default function ProfilePictureSelect() {
  const classes = useStyles();
  const { loading, data } = useQuery(GALLERY);

  if (loading) {
    return (<p>Loaidng...</p>);
  }

  return (
    <div className={classes.root}>
      {
        data.userInRole.profilePictures.map((fileUrl) => (
          <Item key={fileUrl.replace('/', '_')} className={classes.item} url={fileUrl} />))
      }
    </div>
  );
}
