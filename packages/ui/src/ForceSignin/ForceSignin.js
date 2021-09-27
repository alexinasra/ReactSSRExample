import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import AppLoading from '../AppLoading';
import AuthReport from '../AuthReport';


function RedirectDelay({ signinUrl }) {
  const { t } = useTranslation('UI', { useSuspense: false });
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (count>=100) {
      return window.location.replace(signinUrl);
    }
    setTimeout(() => setCount(count + 5), 120);
  }, [count])
  return (
    <AppLoading loadingVariant="determinate" loadingValue={count}>
      <Link href={signinUrl}>{t('RedirectDelay.message')}</Link>
    </AppLoading>
  )
}

export default function ForceSignin({ signinUrl, children }) {
  const [counter, setCounter] = React.useState(0);

  return (
    <AuthReport>
      {({ userInRole }) => (
        userInRole ? children : <RedirectDelay signinUrl={signinUrl} />
      )}
    </AuthReport>
  )
}
