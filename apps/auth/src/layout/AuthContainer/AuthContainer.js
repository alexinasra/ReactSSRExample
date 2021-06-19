import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ThemeModeToggle from '@react-ssrex/ui/build/ThemeModeToggle';
import ThemePaletteSelect from '@react-ssrex/ui/build/ThemePaletteSelect';

import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
  },
  themeButton: {
    margin: theme.spacing(1),
  },
}));

export default function AuthContainer({ children }) {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <Container className={classes.contentContainer}>
        {children}
      </Container>
      <div>
        <ThemeModeToggle className={classes.themeButton} fab />
        <ThemePaletteSelect className={classes.themeButton} fab />
      </div>
    </Container>
  );
}
