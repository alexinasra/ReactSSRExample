import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@mui/material/Icon';

import LayoutSideBarNav, { LayoutSideBarLink } from '@react-ssrex/ui/build/DashboardLayout/LayoutSideBarNav';

export default function MainNav() {
  const { t, ready } = useTranslation('UserConsole', { useSuspense: false });
  if (!ready) return false;
  return (

    <LayoutSideBarNav>
      <LayoutSideBarLink
        label={t('mainNav.editProfile')}
        icon={<Icon>account_circle</Icon>}
        to="/profile"
      />
      <LayoutSideBarLink
        label={t('mainNav.changePassword')}
        icon={<Icon>lock_open</Icon>}
        href="/auth/change-password?redirectto=/userconsole"
      />
      <LayoutSideBarLink
        label={t('mainNav.systemSettings')}
        icon={<Icon>settings</Icon>}
        to="/settings"
      />
    </LayoutSideBarNav>
  );
}
