import { createMuiTheme } from '@material-ui/core/styles';
import { defaultThemePalette } from './themes';

export default function createTheme(mode = 'light', direction = 'ltr') {
  const palette = mode === 'light' ? defaultThemePalette.lightPalette : defaultThemePalette.darkPalette;
  console.log(palette);
  return createMuiTheme({
    ...palette,
    mixins: {
      appBar: {
        minHeight: 120,
      },
    },
    shape: {
      borderRadius: 4,
    },
    direction,
  });
}
