import React from 'react';

import { gql, useMutation } from '@apollo/client';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const SET_THEME_NAME = gql`
  mutation ($themeName: String!) {
    setThemeName(themeName: $themeName) {
      id
      themeSettings {
        name
        mode
      }
    }
  }
`;
export default function ThemePaletteSelect() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [setThemeName] = useMutation(SET_THEME_NAME);
  const handleOpenThemes = (e) => setAnchorEl(e.currentTarget);
  const handleCloseThemes = () => setAnchorEl(null);
  const selectItem = (themeName) => () => {
    setThemeName({variables:{ themeName }})
    handleCloseThemes();
  }
  return (
    <>
      <IconButton
        aria-controls="theme-menu"
        aria-haspopup="true"
        ref={anchorEl}
        onClick={handleOpenThemes}
        color="inherit"
      >
        <Icon>
          palette
        </Icon>
      </IconButton>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseThemes}
      >
        <MenuItem value="default" onClick={selectItem('default')}>default</MenuItem>
        <MenuItem value="deepOrange" onClick={selectItem('deepOrange')}>deepOrange</MenuItem>
      </Menu>
    </>
  );
}
