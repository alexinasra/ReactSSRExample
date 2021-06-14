import React from 'react';
import clsx from 'clsx';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  appBarBackground: {
    position: 'fixed',
    paddingTop: theme.mixins.toolbar.minHeight + 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    background: theme.palette.primary.light,
    width: '100%',
    zIndex: -99999,
    top: theme.mixins.toolbar.minHeight,
    left: 0,
    right: 0,
  },
  appBarSpace: theme.mixins.toolbar,
}));

export default function LayoutBasePage({
  className,
  containerClassName, children,
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div
      className={clsx(classes.root, className)}
    >
      <div className={classes.appBarSpace} />
      <Container
        maxWidth="xl"
        className={clsx(classes.container, containerClassName)}
      >
        {children}
      </Container>
    </div>
  );
}
