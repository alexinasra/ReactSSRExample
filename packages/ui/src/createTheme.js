import { createTheme as createMuiTheme } from '@material-ui/core/styles';
import defaultTheme from './themes/default';
import deepOrangeTheme from './themes/deepOrange';
import customStyles from './styles/custom';
const mapNameToTheme = (themeName) => {
  switch (themeName) {
    case 'deepOrange':
      return deepOrangeTheme;
    default:
      return defaultTheme;
  }
}

export default function createTheme(themeName='default', mode = 'light', direction = 'ltr') {
  const theme = mapNameToTheme(themeName);
  const modedPalette = mode === 'light' ? theme.lightPalette : theme.darkPalette;

  return createMuiTheme({
    ...modedPalette,
    ...(customStyles(modedPalette, mode, direction)),
    direction,
  });
}
