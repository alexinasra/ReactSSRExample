import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MUIAppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
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
}));

export default function AppBar({ onMenuClick }) {
  const classes = useStyles();

  return (

    <MUIAppBar className={classes.appBar} position="fixed">
      <div className={classes.logoContainer}>
        <IconButton onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Link to="/">
          <img height="44" src="/assets/logo.png" alt="lookfor.ae" />
        </Link>
      </div>
      <Toolbar />
    </MUIAppBar>
  );
}
