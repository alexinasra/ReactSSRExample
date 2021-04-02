import React from 'react';
import { useMutation, gql } from '@apollo/client';

const UPLOAD_PROFILE_PIC = gql`
mutation uploadProfilePic($file: Upload!) {
  uploadProfilePicture(file: $file) {
    id
    profilePicture
    profilePictures
  }
}
`;

export default function UploadProfilePicture() {
  const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PIC);
  const handleFileChage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // console.log(file);
      // const formData = new FormData();
      // formData.append('file', file, file.filename);
      uploadProfilePicture({ variables: { file } });
    }
  };
  return (
    <>
      <input type="file" onChange={handleFileChage} />
    </>
  );
}
