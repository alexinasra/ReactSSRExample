import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Suspense from '@react-ssrex/ui/build/Suspense';
import { Translation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AuthReport from '../../AuthReport';
import ThemePaletteSelect from '../../ThemePaletteSelect';
import ThemeModeToggle from '../../ThemeModeToggle';


const useStyles = makeStyles((theme) => ({
  root: {},
  authStatus: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    padding: 1,
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  paletteMenu: {
    position: 'relative',
    display: 'inline-block',
    border: '1px solid',
    width: 'auto'
  },
  paletteMenuList: {
    display: 'inline-block',
    border: '1px solid',
    position: 'relative',
  }
}));


export default function MenuPanel() {
  const classes = useStyles();

  return (
    <AuthReport>
      {({ userInRole }) => userInRole && (
        <>
          <List>
            <ListItem button component="a" href="/userconsole">
              <Suspense fallback="Sign Out">
                <Translation>
                  {(t) => t('UI:WebappLayout.nav.userConsole')}
                </Translation>
              </Suspense>
            </ListItem>
            <ListItem>
              <ThemePaletteSelect />
              <ThemeModeToggle color="primary" />
            </ListItem>
          </List>
        </>
        )}
      </AuthReport>
  );
}
