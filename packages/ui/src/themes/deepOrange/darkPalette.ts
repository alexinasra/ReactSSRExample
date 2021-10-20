import primaryColor from '@mui/material/colors/deepOrange';
import secondaryColor from '@mui/material/colors/blue';

const darkPalette = {
  palette: {
    id: 'deepOrange',
    name: 'Deep Orange',
    type: 'dark',
    mode: 'dark',
    primary: {
      ...primaryColor,
      light: primaryColor[500],
      main: primaryColor[700],
      dark: primaryColor[900],
      contrastText: '#fff',
    },
    secondary: {
      ...secondaryColor,
      light: secondaryColor[500],
      main: secondaryColor[700],
      dark: secondaryColor[900],
      contrastText: '#fff',
    },
  },
};

export default darkPalette;
