import React from 'react';

import { styled } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';


const ApploadingDecorator = styled('div')((theme) => ({
  position: 'absolute',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));


type appLoadingProps = {
  loadingValue?: number,
  loadingVariant?: "determinate" | "indeterminate",
  children?: React.ReactNode,
}

export default function AppLoading({ children, loadingVariant, loadingValue }: appLoadingProps) {
  return (
    <ApploadingDecorator>
      <div>
        <CircularProgress variant={loadingVariant} value={loadingValue}/>
      </div>
      <div>
        {children}
      </div>
    </ApploadingDecorator>
  )
}
