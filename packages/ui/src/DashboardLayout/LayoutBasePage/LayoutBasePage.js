import React from 'react';
import clsx from 'clsx';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LayoutContext from '../LayoutContext';

const useDecorationStyles = makeStyles((theme) => ({
  root: {
    transform: (theme.direction === 'rtl') ? 'scale(-1,1)' : '',
  },
}));

const Decoration = ({ dark = false }) => {
  const classes = useDecorationStyles();
  return (
    <svg
      className={classes.root}
      x="0px"
      y="0px"
      fill={dark ? '#303031' : '#FAFAFA'}
      viewBox="0 0 300 46"
      xmlSpace="preserve"
    >
      <path
        d="M300,46.9L0,47.1V8.9c0,0,21.1,14.3,65.2,14.1c40.6-0.2,76.4-23,128-23C243.3,0,300,16.4,300,16.4V46.9z"
      />
    </svg>
  );
};
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
  decorate, containerClassName, children,
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div
      className={clsx(classes.root, className)}
    >
      <div className={classes.appBarSpace} />
      {decorate && (
      <div className={classes.appBarBackground}>
        <Decoration dark={theme.palette.type === 'dark'} />
      </div>
      )}
      <Container
        maxWidth="xl"
        className={clsx(classes.container, containerClassName)}
      >
        {children}
      </Container>
    </div>
  );
}
