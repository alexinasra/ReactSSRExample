import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { makeStyles, useTheme } from '@mui/styles';
import Typography from '@mui/material/Typography';
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


const useStyles = makeStyles((theme) => ({
  menuItemContent: {
    display: 'flex',
    alignItems: 'center'
  },
  defaultIcon: {
    margin: `auto ${theme.spacing()}px`,
    backgroundColor: blue[500],
    borderRadius: '50%'
  },
  deepOrangeIcon: {
    margin: `auto ${theme.spacing()}px`,
    backgroundColor: deepOrange[500],
    borderRadius: '50%'
  },
}))
const SET_THEME_NAME = gql`
  mutation ($themeName: String!) {
    setThemeName(themeName: $themeName) {
      name
      mode
    }
  }
`;

export default function ThemePaletteSelect({
  className,
  color,
  fab
}) {
  const theme = useTheme();
  const classes = useStyles();

  const [setThemeName] = useMutation(SET_THEME_NAME, {
    update(cache, { data: { setThemeName } }) {
      cache.modify({
        fields: {
          themeSettings(settings) {
            return setThemeName;
          }
        }
      })
    }
  });

  const selectItem = (e) => {
    const { value } = e.target;
    setThemeName({variables:{ themeName: value }})
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
        <div className={classes.menuItemContent}>
          <Icon className={classes.defaultIcon}>palette</Icon>
          {defaultTheme.lightPalette.palette.name}
        </div>
      </MenuItem>
      <MenuItem value={deepOrangeTheme.lightPalette.palette.id}>
        <div className={classes.menuItemContent}>
          <Icon className={classes.deepOrangeIcon}>palette</Icon>
          {deepOrangeTheme.lightPalette.palette.name}
        </div>
      </MenuItem>
    </Select>
  );
}
