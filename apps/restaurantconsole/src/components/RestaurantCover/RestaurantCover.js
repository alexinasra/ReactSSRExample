import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    borderRadius: theme.shape.borderRadius,
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('md')]: {
      width: 640,
      height: 360,
    },
    [theme.breakpoints.up('lg')]: {
      width: 820,
      height: 312,
    },
  },
}));

export default function RestaurantCover({
  src,
  onClick,
}) {
  const language = useMemo(() => document.documentElement.lang || 'en');
  const classes = useStyles();
  return (
    <Button onClick={onClick} className={classes.root}>
      {src ? (
        <img
          className={classes.image}
          src={src}
          alt="restaurant cover"
        />
      ) : (
        <img
          className={classes.image}
          src={`/assets/defaults/default-cover-${language}.png`}
          alt="restaurant cover"
        />
      )}
    </Button>
  );
}
