import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  paper: {
    height: 'calc(100vh - 270px)',
    position: 'absolute',
    padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    top: -260,
    left: 50,
    right: 50,
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
    <Container maxWidth="xl" className={classes.root}>
      <Paper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        elevation={elevation}
        className={classes.paper}
      >
        {children}
      </Paper>
    </Container>
  );
}
