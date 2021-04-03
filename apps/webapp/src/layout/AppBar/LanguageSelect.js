import React, { useState } from 'react';
import i18n from '@react-ssrex/i18n/client';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export default function LanguageSelect() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleLangMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangMenuClose = (lng) => () => {
    if (lng) {
      i18n.changeLanguage(lng).then(() => {
        document.body.dir = i18n.dir(lng);
      });
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleLangMenu}><LanguageIcon /></IconButton>
      <Menu
        key="langmenu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={() => handleLangMenuClose()}
      >
        <MenuItem onClick={handleLangMenuClose('en')}>English</MenuItem>
        <MenuItem onClick={handleLangMenuClose('ar')}>Arabic (ألعربيه)</MenuItem>
        <MenuItem onClick={handleLangMenuClose('he')}>Hebrew (עברית)</MenuItem>
        <MenuItem onClick={handleLangMenuClose('en')}>Russian</MenuItem>
      </Menu>
    </>
  );
}
