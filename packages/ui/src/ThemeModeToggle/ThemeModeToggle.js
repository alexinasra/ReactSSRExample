import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

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
    <IconButton onClick={toggleThemeMode} color="inherit">
      <Icon>
        {theme.palette.type === 'light' ? 'dark_mode' : 'light_mode'}
      </Icon>
    </IconButton>
  );
}
