import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import BasePage from '../LayoutBasePage';

import { styled } from '@mui/material/styles';

const PaperPageDecorator = styled(BasePage)(({ theme }) => ({
  paddingTop: theme.spacing(6)
}))
export default function LayoutPaperPage({
  title,
  subheader,
  avatar = (<Avatar><Icon>bookmark_border</Icon></Avatar>),
  children,
}) {
  const [elevation, setElevation] = React.useState(18);

  const handleMouseEnter = () => {
    setElevation(24);
  };
  const handleMouseLeave = () => {
    setElevation(12);
  };
  return (
    <PaperPageDecorator decorate>
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        elevation={elevation}
      >
        {title && (
          <CardHeader
            sx={{
              background: theme => theme.palette.type === 'light'
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
            }}
            avatar={avatar}
            title={title}
            subheader={subheader}
          />
        )}
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </PaperPageDecorator>
  );
}
