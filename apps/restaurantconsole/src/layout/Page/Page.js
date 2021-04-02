import React from 'react';
import Container from '@material-ui/core/Container';

export default function Page({ className, children }) {
  return (
    <Container className={className}>
      {children}
    </Container>
  );
}
