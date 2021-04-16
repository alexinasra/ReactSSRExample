import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LayoutContext from './LayoutContext';
import layoutReducer, { expandSidebarAction, shrinkSidebarAction } from './LayoutReducer';
import layoutDefaultState from './LayoutDefaultState';

import LayoutAppBar from './LayoutAppBar';
import LayoutSideBar from './LayoutSideBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export default function LayoutContainer({ children }) {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(layoutReducer, layoutDefaultState);

  return (
    <LayoutContext.Provider value={{
      state: { ...state },
      expandSidebar: () => dispatch(expandSidebarAction()),
      shrinkSidebar: () => dispatch(shrinkSidebarAction()),
    }}
    >
      <div className={classes.root}>
        <CssBaseline />
        <LayoutAppBar />
        <LayoutSideBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
    </LayoutContext.Provider>
  );
}
