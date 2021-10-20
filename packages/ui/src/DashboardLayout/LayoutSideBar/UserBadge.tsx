import React from 'react';
import Avatar from '@mui/material/Avatar';
import StatusBadge, { Status } from '../../StatusBadge';

export default function UserBadge({ user, size }) {
  return (
    <StatusBadge status={Status.Online}>
      <Avatar sx={{
        width: theme => theme.spacing(size==="lg"? 8 : 4),
        height: theme => theme.spacing(size==="lg"? 8 : 4)
      }} src={user.profilePicture} />
    </StatusBadge>
  );
}
