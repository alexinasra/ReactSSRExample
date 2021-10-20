import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import BasePage from '../LayoutBasePage';

import { styled } from '@mui/material/styles';

type layoutPaperPage = {
  title: string,
  subheader: string,
  avatar: JSX.Element
  children: React.ReactChildren
}

export default function LayoutPaperPage({
  title,
  subheader,
  avatar = (<Avatar><Icon>bookmark_border</Icon></Avatar>),
  children,
}: layoutPaperPage) {
  return (
    <BasePage decorate>
      <Card elevation={3}>
        {title && (
          <CardHeader
            sx={{
              background: theme => theme.palette.mode === 'light'
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
    </BasePage>
  );
}
