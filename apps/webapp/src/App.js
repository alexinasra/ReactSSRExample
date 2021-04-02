import React from 'react';
import {
  Switch, Route,
} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import AppContainer from './layout/AppContainer';
import AppBar from './layout/AppBar';

import HomePage from './pages/HomePage';
import { PageNotFound } from './pages/ErrorPage';

const useStyles = makeStyles((theme) => ({
  root: {},
  searchContainer: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchDivider: {
    height: 28,
    margin: 4,
  },
  searchButton: { padding: 10 },
}));

function App() {
  const classes = useStyles();

  const menuButton = (
    <IconButton>
      <MenuIcon />
    </IconButton>
  );
  const search = (
    <Paper className={classes.searchContainer}>
      <InputBase
        className={classes.searchInput}
        placeholder="type profition name ..."
        inputProps={{ 'aria-label': 'search input' }}
      />
      <Divider className={classes.searchDivider} orientation="vertical" />
      <IconButton className={classes.searchButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );

  return (
    <AppContainer
      appBar={(
        <AppBar
          logoSrc="/assets/logo.png"
          logoDescription="Lookfor.ae"
          menuButton={menuButton}
        >
          {search}
        </AppBar>
        )}
    >
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/404">
          <PageNotFound />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default App;
