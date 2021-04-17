import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
const useStyles = makeStyles((theme) => ({
  online: {
    background: theme.palette.success.main,
  },
  offline: {
    background: theme.palette.grey[500],
  },
  busy: {
    background: theme.palette.error.main,
  },
}), 'StatusBadge')

export default function StatusBadge({ status = "offline", className, children }) {
  const classes = useStyles();
  return (
    <Badge className={className} classes={{ badge: classes[status] }} variant="dot">
      { children }
    </Badge>
  )
}
