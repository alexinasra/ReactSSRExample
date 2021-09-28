import React from 'react';
import { styled } from '@mui/material/styles';



const Main = styled('main')({
  position: 'relative',
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
})
export default function LayoutContentContainer({children}) {
  return (
    <Main>
      {children}
    </Main>
  );
}
