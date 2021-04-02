import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SwipeableViews from 'react-swipeable-views';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ProfilePictureSelect from './ProfilePictureSelect';
import UploadProfilePicture from './UploadProfilePicture';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
}));
const GET_PROFILE_PIC = gql`
query ProfilePic {
  userInRole {
    id
    profilePicture
  }
}
`;

export default function ProfilePictureDialog({ open, onClose }) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PROFILE_PIC);
  const [tabIndex, setTabIndex] = React.useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return (<p>Loading ...</p>);
  }
  if (error) {
    return (<pre>JSON.stringify(error, null ,2)</pre>);
  }

  return (
    <Dialog open={open} className={classes.root}>
      <DialogTitle className={classes.title}>
        <Avatar src={data.userInRole.profilePicture} />
      </DialogTitle>
      <DialogContent>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab id="tab_upload" aria-controls="ppic-tab-0" label="Upload" />
          <Tab id="tab_gallery" aria-controls="ppic-tab-1" label="Gallery" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabIndex}
          onChangeIndex={setTabIndex}
        >
          <div
            role="tabpanel"
            hidden={tabIndex !== 0}
            id="ppic-tabpanel-0"
            aria-labelledby="ppic-tab-0"
          >
            {
            tabIndex === 0 && (
              <UploadProfilePicture />
            )
          }
          </div>
          <div
            role="tabpanel"
            hidden={tabIndex !== 1}
            id="ppic-tabpanel-1"
            aria-labelledby="ppic-tab-1"
          >
            {
          tabIndex === 1 && (
            <ProfilePictureSelect />
          )
        }
          </div>
        </SwipeableViews>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
