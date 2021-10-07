import React from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { useTheme, styled } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import Icon from '@mui/material/Icon';
import defaultTheme, {
  deepOrangeTheme
} from '../themes';
import blue from '@mui/material/colors/blue';
import deepOrange from '@mui/material/colors/deepOrange';
import Cookies from 'js-cookie'


const ThemeOption = styled('div')({
  display: 'flex',
  px: 2
});

export default function ThemePaletteSelect({
  color,
  fab
}) {
  const client = useApolloClient();

  const theme = useTheme();

  const selectItem = (e) => {
    const { value } = e.target;
    Cookies.set('themeName', value);
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
          name: value,
          mode: theme.palette.mode
        }
      }
    })
  }
  return (
    <Select
      id="theme-menu"
      autoWidth
      variant="standard"
      value={theme.palette.id}
      onChange={selectItem}
    >
      <MenuItem
        dense
        value={defaultTheme.lightPalette.palette.id}
      >
        <ThemeOption>
          <Icon
            sx={{
              mx: 1,
            }}>palette</Icon>
            <Typography>
              {defaultTheme.lightPalette.palette.name}
            </Typography>
          </ThemeOption>
      </MenuItem>
      <MenuItem
        dense
        value={deepOrangeTheme.lightPalette.palette.id}
      >
        <ThemeOption>
          <Icon sx={{
            mx: 1,
          }}>palette</Icon>
          <Typography>
            {deepOrangeTheme.lightPalette.palette.name}
          </Typography>
        </ThemeOption>
      </MenuItem>
    </Select>
  );
}
