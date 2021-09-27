import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Icon from "@mui/material/Icon";
import ImageEditor from '../ImageEditor';
const imageProps = {
  avatar: {
    sizes: {
      sm: {
        width: "64px",
        height: "64px"
      },
      md: {
        width: "128px",
        height: "128px"
      },
      lg: {
        width: "128px",
        height: "128px"
      },
    }
  },
  cover: {
    sizes: {
      sm: {
        width: "640px",
        height: "360px"
      },
      md: {
        width: "820px",
        height: "312px"
      },
      lg: {
        width: "820px",
        height: "312px"
      },
    }
  }
}

const useStyles = makeStyles(() => ({
  root: {},
  hiddenElement: {
    display: 'none',
  },
  emptyImage: {

  },
  activeImage: {},
}))

export default function ImageDialog({
  onConfirm = () => {},
  onCancel = () => {},
  confirmText = 'Confirm',
  uploadText = 'Select Image',
  cancelText = 'Back',
  fallbackImage = '/assets/defaults/default-cover-en.png',
  imageType = "avatar",
}) {
  const classes = useStyles();
  const [urlData, setUrlData] = useState(false);
  const [upUrlData, setUpUrlData] = useState(false);
  const [file, setFile] = useState(false);

  useEffect(() => {
    if (file) {
      const freader = new FileReader();
      freader.onloadend = (e) => {
        setUrlData(e.target.result);
      };
      freader.readAsDataURL(file);
    }
  }, [file])
  const inputRef = useRef(null);
  const handleInputChange = (e) => {
    const { files } = e.target;
    console.log(files);
    setFile(files[0]);
  }
  return (
    <Dialog open className={classes.root}>
      <AppBar>
        <Toolbar>
          <Button onClick={onCancel}>
            <Icon>close</Icon>
            <Typography>
              {cancelText}
            </Typography>
          </Button>
          <Button onClick={() => inputRef.current.click()}>
            <Icon>file_upload</Icon>
            <Typography>
              {uploadText}
            </Typography>
          </Button>
          <Button onClick={onConfirm}>
            <Icon>check</Icon>
            <Typography>
              {confirmText}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {urlData ? (
          <div className={classes.activeImage}>
            {upUrlData && <img src={upUrlData} alt="Preview Image" />}
            <ImageEditor onCropDone={(d) => setUpUrlData(d)} upImg={urlData} />
          </div>
        ) : (
          <div className={classes.emptyImage}>
            <Button onClick={() => inputRef.current.click()}>
              <img src={fallbackImage} alt="Fallback image"/>
            </Button>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleInputChange}
          className={classes.hiddenElement}
        />
      </DialogContent>
    </Dialog>
  )
}
