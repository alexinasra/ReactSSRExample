import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@mui/styles';

import SwipeableViews from 'react-swipeable-views';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import ProfilePictureSelect from './ProfilePictureSelect';
import UploadProfilePicture from './UploadProfilePicture';

const GET_PROFILE_PIC = gql`
query ProfilePic {
  userInRole {
    id
    profilePicture
  }
}
`;

export default function ProfilePictureDialog({ open, onClose }) {
  const { t, ready } = useTranslation('UserConsole', { useSuspense: false });
  const { loading, error, data } = useQuery(GET_PROFILE_PIC);
  const [tabIndex, setTabIndex] = React.useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  if (!ready) {
    return false;
  }
  if (loading) {
    return (<p>Loading ...</p>);
  }
  if (error) {
    return (<pre>JSON.stringify(error, null ,2)</pre>);
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
      }}
      >
        <Avatar src={data.userInRole.profilePicture} />
      </DialogTitle>
      <DialogContent>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab id="tab_upload" aria-controls="ppic-tab-0" label={t('userProfile.upload')} />
          <Tab id="tab_gallery" aria-controls="ppic-tab-1" label={t('userProfile.gallery')} />
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
        <Button onClick={onClose}>{t('userProfile.close')}</Button>
      </DialogActions>
    </Dialog>
  );
}
