import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';


const DefaultTheme = withStyles((theme) => ({
  iconBG: {
    backgroundColor: blue[500],
    borderRadius: '50%'
  }
}))(({ classes, onClick}) => {
  return (
    <MenuItem value="default" onClick={onClick('default')}>
      <ListItemIcon>
        <Icon className={classes.iconBG} />
      </ListItemIcon>
      <ListItemText>Default</ListItemText>
    </MenuItem>
  );
})
const DeepOrangeTheme = withStyles((theme) => ({
  iconBG: {
    backgroundColor: deepOrange[500],
    borderRadius: '50%'
  }
}))(({ classes, onClick}) => {
  return (
    <MenuItem value="deepOrange" onClick={onClick('deepOrange')}>
      <ListItemIcon>
        <Icon className={classes.iconBG} />
      </ListItemIcon>
      <ListItemText>Deep Orange</ListItemText>
    </MenuItem>
  );
})

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
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  const handleOpenThemes = (e) => setAnchorEl(e.currentTarget);
  const handleCloseThemes = () => setAnchorEl(null);
  const selectItem = (themeName) => () => {
    setThemeName({variables:{ themeName }})
    handleCloseThemes();
  }
  const Component = fab ? Fab : IconButton;
  return (
    <>
      <Component
        color={color}
        className={className}
        aria-controls="theme-menu"
        aria-haspopup="true"
        ref={anchorEl}
        onClick={handleOpenThemes}
      >
        <Icon>
          palette
        </Icon>
      </Component>
      <Menu
      variant="selectedMenu"
        id="theme-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseThemes}
      >
        <DefaultTheme onClick={selectItem} />
        <DeepOrangeTheme onClick={selectItem} />
      </Menu>
    </>
  );
}
