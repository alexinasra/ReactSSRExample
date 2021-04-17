import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import BasePage from './BasePage';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
  },
  paper: {
    // padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
  },

}));

export default function LayoutPage({
  title,
  subheader,
  avatar = (<Avatar><Icon>bookmark_border</Icon></Avatar>),
  children,
}) {
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
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        elevation={elevation}
        className={classes.paper}
      >
        {title && (
          <CardHeader avatar={avatar} title={title} subheader={subheader} />
        )}
        <CardContent>

          {children}
        </CardContent>
      </Card>
    </BasePage>
  );
}
