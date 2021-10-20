import React from 'react';

import Badge from '@mui/material/Badge';

export enum Status {
  Online = "online",
  Offline = "offline",
  Busy = "busy"
}

type statusBadgeProps = {
  status?: Status,
  children: React.ReactNode
}

export default function StatusBadge({ status = Status.Offline, children }: statusBadgeProps) {
  switch (status) {
    case Status.Online:
      return <Badge color="success" variant="dot">{children}</Badge>
    case Status.Busy:
      return <Badge color="warning" variant="dot">{children}</Badge>
    case Status.Offline:
    default:
      return <Badge color="error" variant="dot">{children}</Badge>
  }
}
