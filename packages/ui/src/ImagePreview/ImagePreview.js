
import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  isLoading: {
    opacity: 0,
  },
  img: {
    height: theme.spacing(14),
  },
  loading: {},
}));

export default function ImagePreview({ img, className }) {
  const classes = useStyles();
  const [urlData, setUrlData] = useState(false);
  const freader = new FileReader();

  freader.onloadend = (e) => {
    setUrlData(e.target.result);
  };
  freader.readAsDataURL(img);
  return (
    <div className={clsx(classes.root, { [classes.isLoading]: !urlData }, className)}>
      {!urlData ? (
        <p className={classes.loading}>loading</p>
      ) : (
        <img
          className={classes.img}
          src={urlData}
          alt="gallery item"
        />
      )}
    </div>
  );
}
