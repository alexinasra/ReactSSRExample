import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
    secondary: amber,
  },
});

export default theme;
