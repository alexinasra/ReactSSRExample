import React from 'react';

import Badge from '@mui/material/Badge';

export default function StatusBadge({ status = "offline", children }) {
  switch (status) {
    case 'online':
      return <Badge color="success" variant="dot">{children}</Badge>
    case 'busy':
      return <Badge color="warning" variant="dot">{children}</Badge>
    default:
      return <Badge color="error" variant="dot">{children}</Badge>
  }
}
