import React from 'react';
import Container from '@material-ui/core/Container';

export default function Page({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}
