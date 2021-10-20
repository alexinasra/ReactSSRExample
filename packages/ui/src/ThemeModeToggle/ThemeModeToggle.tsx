import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useApolloClient, gql } from '@apollo/client';
import Switch from '@mui/material/Switch';
import Icon from '@mui/material/Icon';
import Cookies from 'js-cookie'
import LayoutPalette from '../themes/LayoutPalette';

export default function ThemeModeToggle() {
  const theme = useTheme()
  const client = useApolloClient();
  const toggleThemeMode = () => {
    const mode = theme.palette.mode === 'dark' ? 'light' : 'dark';
    Cookies.set('themeMode', mode);

    client.cache.writeQuery({
      query: gql`
        query ThemeSettings {
          themeSettings {
            name
            mode
          }
        }
      `,
      data: {
        themeSettings: {
          mode,
          name: (theme.palette as LayoutPalette).id
        }
      }
    })
  }
  return (
    <Switch
      checked={theme.palette.mode === 'light'}
      onChange={toggleThemeMode}
      color="secondary"
      checkedIcon={<Icon fontSize="small">light_mode</Icon>}
      icon={<Icon fontSize="small">dark_mode</Icon>} />
  );
}
