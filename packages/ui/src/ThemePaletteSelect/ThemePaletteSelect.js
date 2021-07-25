import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
import defaultTheme, {
  deepOrangeTheme
} from '../themes';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';


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
