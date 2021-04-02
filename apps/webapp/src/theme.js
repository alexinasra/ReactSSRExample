import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/deepOrange';
import lightBlue from '@material-ui/core/colors/lightBlue';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: orange,
    secondary: lightBlue,
    error: {
      main: red.A400,
    },
  },
});

export default theme;
