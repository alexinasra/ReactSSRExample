import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/lightGreen';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: red,
    secondary: green,
  },
});

export default theme;
