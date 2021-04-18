import { createMuiTheme } from '@material-ui/core/styles';
import { defaultThemePalette, deepOrangeThemePalette } from './themes';

const mapNameToTheme = (themeName) => {
  switch (themeName) {
    case 'deepOrange':
      return deepOrangeThemePalette;
    default:
      return defaultThemePalette;
  }
}

export default function createTheme(theme='default', mode = 'light', direction = 'ltr') {
  const themePalette = mapNameToTheme(theme);
  const modedPalette = mode === 'light' ? themePalette.lightPalette : themePalette.darkPalette;

  return createMuiTheme({
    ...modedPalette,
    direction,
  });
}
