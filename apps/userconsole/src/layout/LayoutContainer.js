import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LayoutContext from './LayoutContext';

import LayoutAppBar from './LayoutAppBar';
import LayoutSideBar from './LayoutSideBar';

const Decoration = ({ dark = false, direction = 'ltr' }) => (
  <svg
    x="0px"
    y="0px"
    viewBox="0 0 300 46"
    xmlSpace="preserve"
    style={direction === 'ltr' ? { transform: 'scale(-1,1)' } : {}}
  >
    <path
      fill={dark ? '#303031' : '#FAFAFA'}
      d="M300,46.9L0,47.1V8.9c0,0,21.1,14.3,65.2,14.1c40.6-0.2,76.4-23,128-23C243.3,0,300,16.4,300,16.4V46.9z"
    />
  </svg>
);
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarBackground: {
    paddingTop: theme.mixins.toolbar.minHeight + 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    background: theme.palette.primary.dark,
    height: '45vh',
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export default function LayoutContainer({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <LayoutContext.Consumer>
      {({ state: { themeMode } }) => (
        <div className={classes.root}>
          <CssBaseline />
          <LayoutAppBar />
          <LayoutSideBar />
          <main className={classes.content}>
            <div className={classes.appBarBackground}>
              <Decoration dark={themeMode === 'dark'} direction={theme.direction} />
            </div>
            {children}
          </main>
        </div>
      )}
    </LayoutContext.Consumer>
  );
}
