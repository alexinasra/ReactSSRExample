import React, { Suspense } from 'react';
import { makeStyles } from '@mui/styles';
import { Translation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
