import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AuthStatus from './AuthStatus';
import LanguageSelect from './LanguageSelect';

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: theme.palette.grey['800'],
  },
  appbarToolbar: {
    display: 'flex',
    flexDirection: 'row',
  },
  appbarMenuButtonBox: {
    color: '#FFF !important',
    margin: 'auto 16px',
    '& .MuiButtonBase-root': {
      color: '#FFF',
    },
  },
  appbarLogoBox: {
    margin: 'auto 8px',
    [theme.breakpoints.only('sm')]: {
      border: '1px solid white',
      flexGrow: 1,
      '& img': {
        margin: '0 auto',
      },
    },
  },
  appbarTitleBox: {
    margin: 'auto 8px',
  },
  appbarSpaceBox: {
    margin: 'auto 8px',
    flexGrow: 1,
  },
  appbarStatusBox: {

    '& .MuiButtonBase-root': {
      color: '#FFF',
    },
  },
}));

export default function AppBar({
  menuButton,
  logoSrc,
  logoDescription,
  title,
  children,
}) {
  const classes = useStyles();

  return (
    <MUIAppBar position="relative" className={classes.appbar}>
      <Toolbar className={classes.appbarToolbar}>
        <Grid container>
          {menuButton && (
          <Grid
            item
            xs={1}
            md="auto"
            className={classes.appbarMenuButtonBox}
          >
            {menuButton}
          </Grid>
          )}
          {logoSrc && (
          <Grid
            item
            xs={9}
            md={2}
            className={classes.appbarLogoBox}
          >
            <Link to="/">
              <img height="55" src={logoSrc} alt={logoDescription} />
            </Link>
          </Grid>
          )}
          {title && (
          <Grid item sm={false} className={classes.appbarTitleBox}>
            <Typography>
              {title}
            </Typography>
          </Grid>
          )}
          <Grid item className={classes.appbarSpaceBox}>{children}</Grid>
          <Grid item className={classes.appbarStatusBox}>
            <AuthStatus />
          </Grid>
          <Grid item className={classes.appbarStatusBox}>
            <LanguageSelect />
          </Grid>

        </Grid>
      </Toolbar>
    </MUIAppBar>
  );
}
