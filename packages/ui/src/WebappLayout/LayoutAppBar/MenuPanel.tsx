import React, { Suspense } from 'react';
import { Translation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AuthReport from '../../AuthReport';
import ThemePaletteSelect from '../../ThemePaletteSelect';
import ThemeModeToggle from '../../ThemeModeToggle';

export default function MenuPanel() {

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
              <ThemeModeToggle />
            </ListItem>
          </List>
        </>
        )}
      </AuthReport>
  );
}
