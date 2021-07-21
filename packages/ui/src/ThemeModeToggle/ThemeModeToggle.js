import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';

const TGL_THEME_MODE = gql`
  mutation{
    toggleThemeMode {
      name
      mode
    }
  }
`;

export default function ThemeModeToggle({
  className,
}) {
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
      className={className}
      onChange={toggleThemeMode}
      checkedIcon={<Icon fontSize="small">light_mode</Icon>}
      icon={<Icon fontSize="small">dark_mode</Icon>} />
  );
}
