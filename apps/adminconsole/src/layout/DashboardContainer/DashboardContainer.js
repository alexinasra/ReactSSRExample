import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

import DashboardSidebar from '../DashboardSidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: `${theme.mixins.toolbar.minHeight + theme.spacing(4)}px`,
  },
  appBar: {
    background: theme.palette.grey['800'],
    color: theme.palette.grey['300'],
    height: theme.mixins.toolbar.minHeight,
    display: 'flex',
    flexDirection: 'row',
  },
  logoContainer: {
    display: 'inline-flex',
    height: theme.mixins.toolbar.minHeight - 2,
    justifyContent: 'center',
    margin: `auto ${theme.spacing(2)}px`,
    alignItems: 'center',
    boxSizing: 'border-box',
    color: theme.palette.grey['300'],
    '&  .MuiIconButton-root': {
      color: theme.palette.grey['300'],
    },
  },
  asideDrawer: {
    '& header': {
      background: theme.palette.grey['800'],
    },
    '& .MuiDivider-root': {
      height: '5px',
    },
  },
  contentContainer: {

  },
}));

export default function DashboardContainer({
  logo,
  toolbar,
  children,
}) {
  const classes = useStyles();
  const [uiState, setUiState] = useState({
    asideOpen: false,
  });

  const handleAsideOpen = () => {
    setUiState({ asideOpen: true });
  };
  const handleAsideClose = () => {
    setUiState({ asideOpen: false });
  };

  return (
    <Container className={classes.root} maxWidth="lg">
      <AppBar className={classes.appBar} position="fixed">
        <div className={classes.logoContainer}>
          <IconButton onClick={handleAsideOpen}>
            <MenuIcon />
          </IconButton>
          {logo}
        </div>
        {toolbar}
      </AppBar>
      <Drawer
        className={classes.asideDrawer}
        anchor="left"
        open={uiState.asideOpen}
        onClose={handleAsideClose}
      >
        <header>
          <div className={classes.logoContainer}>
            <IconButton onClick={handleAsideClose}>
              <MenuIcon />
            </IconButton>
            {logo}
          </div>
          <Divider />
        </header>
        <DashboardSidebar />
      </Drawer>
      <Container className={classes.contentContainer}>
        {children}
      </Container>
    </Container>
  );
}
