import primaryColor from '@material-ui/core/colors/deepOrange';
import secondaryColor from '@material-ui/core/colors/blue';

const darkPalette = {
  palette: {
    type: 'dark',
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
