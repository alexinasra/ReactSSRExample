import React from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { useTheme } from '@mui/styles';
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
      variant="outlined"
      value={theme.palette.id}
      onChange={selectItem}
    >
      <MenuItem value={defaultTheme.lightPalette.palette.id}>
        <Box sx={{display: 'flex',
          alignItems: 'center'}}>
          <Icon sx={{
            margin: theme => `auto ${theme.spacing(1)}px`,
            backgroundColor: blue[500],
            borderRadius: '50%'
          }}>palette</Icon>
          {defaultTheme.lightPalette.palette.name}
        </Box>
      </MenuItem>
      <MenuItem value={deepOrangeTheme.lightPalette.palette.id}>
        <Box sx={{display: 'flex',
          alignItems: 'center'}}>
          <Icon sx={{
            margin: theme => `auto ${theme.spacing(1)}px`,
            backgroundColor: deepOrange[500],
            borderRadius: '50%'
          }}>palette</Icon>
          {deepOrangeTheme.lightPalette.palette.name}
        </Box>
      </MenuItem>
    </Select>
  );
}
