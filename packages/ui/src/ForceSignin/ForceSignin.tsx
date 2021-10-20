import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import AppLoading from '../AppLoading';
import AuthReport from '../AuthReport';



type redirectDelayProps = {
  redirectUrl: string
}

function RedirectDelay({ redirectUrl }: redirectDelayProps) {
  const { t } = useTranslation('UI', { useSuspense: false });
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (count>=100) {
      return window.location.replace(redirectUrl);
    }
    setTimeout(() => setCount(count + 5), 120);
  }, [count])
  return (
    <AppLoading loadingVariant="determinate" loadingValue={count}>
      <Link href={redirectUrl}>{t('RedirectDelay.message')}</Link>
    </AppLoading>
  )
}

type forceSigninProps = {
  signinUrl: string
  children: React.ReactChildren
}
export default function ForceSignin({ signinUrl, children }: forceSigninProps) {
  const [counter, setCounter] = React.useState(0);

  return (
    <AuthReport>
      {({ userInRole }) => (
        userInRole ? <>{children}</> : <RedirectDelay redirectUrl={signinUrl} />
      )}
    </AuthReport>
  )
}
