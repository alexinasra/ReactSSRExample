import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LayoutContext from '../LayoutContext';

const ScaleTransformSvg = styled('svg')(({theme}) => ({
  transform: (theme.direction === 'rtl') ? 'scale(-1,1)' : '',
  fill: theme.palette.background.default
}))

const Decoration = () => {
  return (
    <ScaleTransformSvg
      x="0px"
      y="0px"
      viewBox="0 0 300 46"
      xmlSpace="preserve"
    >
      <path
        d="M300,46.9L0,47.1V8.9c0,0,21.1,14.3,65.2,14.1c40.6-0.2,76.4-23,128-23C243.3,0,300,16.4,300,16.4V46.9z"
      />
    </ScaleTransformSvg>
  );
};

const PageContainer = styled('div')(({theme}) => ({
  position: 'relative',
}))
const DecorationContainer = styled('div')(({theme}) => ({
  position: 'fixed',
  paddingTop: theme.mixins.toolbar.minHeight + 20,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  background: theme.palette.primary.light,
  width: '100%',
  zIndex: -99999,
  top: theme.mixins.toolbar.minHeight,
  left: 0,
  right: 0
}))
const ToolbarSpacing = styled('div')(({theme}) => ({
  height: theme.mixins.toolbar.minHeight + 20
}));
export default function LayoutBasePage({
  decorate,
  children,
}) {
  const theme = useTheme();
  return (
    <PageContainer>
      <ToolbarSpacing />
      {decorate && (
      <DecorationContainer>
        <Decoration />
      </DecorationContainer>
      )}
      <Container
        maxWidth="xl"
      >
        {children}
      </Container>
    </PageContainer>
  );
}
