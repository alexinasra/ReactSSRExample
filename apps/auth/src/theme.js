import { createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/red';
import secondary from '@material-ui/core/colors/lightGreen';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary,
    secondary,
  },
});

export default theme;
