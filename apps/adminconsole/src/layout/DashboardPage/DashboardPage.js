import React from 'react';
import Container from '@material-ui/core/Container';

export default function DashboardPage({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}
