import React from 'react';
import { styled } from '@mui/material/styles';

type layoutContentContainerProps = {
  children: React.ReactChildren
}

const Main = styled('main')({
  position: 'relative',
  flexGrow: 1,
})
export default function LayoutContentContainer({ children }: layoutContentContainerProps) {
  return (
    <Main>
      {children}
    </Main>
  );
}
