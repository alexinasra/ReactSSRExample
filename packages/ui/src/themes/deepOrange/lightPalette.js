import primaryColor from '@mui/material/colors/deepOrange';
import secondaryColor from '@mui/material/colors/blue';

const lightPalette = {
  palette: {
    id: 'deepOrange',
    name: 'Deep Orange',
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
