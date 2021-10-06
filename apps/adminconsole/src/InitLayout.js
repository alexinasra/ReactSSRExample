import React from 'react';

import LayoutContainer from '@react-ssrex/ui/build/DashboardLayout/LayoutContainer';
import LayoutContentContainer from '@react-ssrex/ui/build/DashboardLayout/LayoutContentContainer';
import LayoutAppBar from '@react-ssrex/ui/build/DashboardLayout/LayoutAppBar';
import LayoutSideBar from '@react-ssrex/ui/build/DashboardLayout/LayoutSideBar';

import LayoutSideBarToggle from '@react-ssrex/ui/build/DashboardLayout/LayoutSideBarToggle';

import ThemeModeToggle from '@react-ssrex/ui/build/ThemeModeToggle';
import ThemePaletteSelect from '@react-ssrex/ui/build/ThemePaletteSelect';

import ForceSignin from '@react-ssrex/ui/build/ForceSignin';
import MainNav from './MainNav';

export default function InitLayout({ children }) {
  return (
    <ForceSignin signinUrl="/auth/signin">
      <LayoutContainer>
        <LayoutAppBar>
          <LayoutSideBarToggle />
          <ThemeModeToggle />
          <ThemePaletteSelect />
        </LayoutAppBar>
        <LayoutSideBar mainNav={<MainNav />} />
        <LayoutContentContainer>
          {children}
        </LayoutContentContainer>
      </LayoutContainer>
    </ForceSignin>

  );
}
