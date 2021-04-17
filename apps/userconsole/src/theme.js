import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

export default function createTheme(mode = 'light', direction = 'ltr') {
  return createMuiTheme({
    palette: {
      type: mode,
      primary: blue,
      secondary: amber,
    },
    mixins: {
      toolbar: {
        minHeight: 120,
      },
    },
    direction,
  });
}
