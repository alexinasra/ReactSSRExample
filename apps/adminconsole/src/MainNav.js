import React from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '@mui/material/Icon';
import LayoutSideBarNav, { LayoutSideBarLink } from '@react-ssrex/ui/build/DashboardLayout/LayoutSideBarNav';

export default function MainNav() {
  const { t } = useTranslation('AdminConsole', { useSuspense: false });
  return (
    <LayoutSideBarNav>
      <LayoutSideBarLink
        label={t('MainNav.dashboard')}
        icon={<Icon>dashboard</Icon>}
        to="/"
      />
      <LayoutSideBarLink
        label={t('MainNav.systemNotifications')}
        icon={<Icon>notifications</Icon>}
        to="/system-notifications"
      />
      <LayoutSideBarLink
        label={t('MainNav.users')}
        icon={<Icon>people</Icon>}
        to="/users"
      />
      <LayoutSideBarLink
        label="Polls"
        icon={<Icon>poll</Icon>}
        to="/polls"
      />
      <LayoutSideBarLink
        label={t('MainNav.translations')}
        icon={<Icon>drafts</Icon>}
        to="/translations/common"
      />
    </LayoutSideBarNav>
  );
}
