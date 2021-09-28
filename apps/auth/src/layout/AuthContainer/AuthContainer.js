import React from 'react';
import Container from '@mui/material/Container';
import ThemeModeToggle from '@react-ssrex/ui/build/ThemeModeToggle';
import ThemePaletteSelect from '@react-ssrex/ui/build/ThemePaletteSelect';

import CssBaseline from '@mui/material/CssBaseline';

export default function AuthContainer({ children }) {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Container>
        {children}
      </Container>
      <div>
        <ThemeModeToggle sx={{ margin: (theme) => theme.spacing(1) }} fab />
        <ThemePaletteSelect sx={{ margin: (theme) => theme.spacing(1) }} fab />
      </div>
    </Container>
  );
}
