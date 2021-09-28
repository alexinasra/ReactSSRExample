import React from 'react';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function AuthPage({
  children,
  className,
}) {
  return (
    <Container maxWidth="sm" className={className}>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </Container>
  );
}
