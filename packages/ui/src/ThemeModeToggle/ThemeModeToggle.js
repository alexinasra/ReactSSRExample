import React from 'react';
import { useTheme } from '@mui/styles';
import { gql, useMutation } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Icon from '@mui/material/Icon';

const TGL_THEME_MODE = gql`
  mutation{
    toggleThemeMode {
      name
      mode
    }
  }
`;

export default function ThemeModeToggle() {
  const theme = useTheme()
  const [toggleThemeMode] = useMutation(TGL_THEME_MODE, {
    update(cache, { data: { toggleThemeMode } }) {
      cache.modify({
        fields: {
          themeSettings(settings) {
            return toggleThemeMode;
          }
        }
      })
    }
  });
  return (
    <Switch
      checked={theme.palette.type === 'light'}
      onChange={toggleThemeMode}
      color="secondary"
      checkedIcon={<Icon fontSize="small">light_mode</Icon>}
      icon={<Icon fontSize="small">dark_mode</Icon>} />
  );
}
