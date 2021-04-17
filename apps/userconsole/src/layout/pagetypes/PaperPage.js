import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BasePage from './BasePage';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
  },
  paper: {
    height: 'calc(100vh - 270px)',
    padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
  },

}));

export default function LayoutPage({ children }) {
  const classes = useStyles();
  const [elevation, setElevation] = React.useState(18);

  const handleMouseEnter = () => {
    setElevation(24);
  };
  const handleMouseLeave = () => {
    setElevation(12);
  };
  return (
    <BasePage containerClassName={classes.root} decorate>
      <Paper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        elevation={elevation}
        className={classes.paper}
      >
        {children}
      </Paper>
    </BasePage>
  );
}
