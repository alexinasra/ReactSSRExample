import primaryColor from '@mui/material/colors/blue';
import secondaryColor from '@mui/material/colors/lightGreen';

const lightPalette = {
  palette: {
    id: 'default',
    name: 'Default',
    type: 'light',
    primary: {
      ...primaryColor,
      light: primaryColor[300],
      main: primaryColor[500],
      dark: primaryColor[700],
      contrastText: '#fff',
    },
    secondary: {
      ...secondaryColor,
      light: secondaryColor[300],
      main: secondaryColor[500],
      dark: secondaryColor[700],
      contrastText: '#fff',
    },
  },
};

export default lightPalette;
