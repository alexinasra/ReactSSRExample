import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from "@material-ui/core/Icon";
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
