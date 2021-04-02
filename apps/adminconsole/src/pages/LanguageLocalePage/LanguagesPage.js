import React, { useEffect, useState } from 'react';
import i18n from '@foodle/i18n/client';
import Typography from '@material-ui/core/Typography';
import { Translation } from 'react-i18next';
import Suspense from '@foodle/ui/build/Suspense';
import DashboardPage from '../../layout/DashboardPage';

export default function LanguagesPage() {
  const [state, setState] = useState({
    languages: i18n.languages || [],
    defaultLanguage: 'en',
  });

  useEffect(() => Promise.all([
    fetch('/translations/languages').then((resp) => resp.json()),
    fetch('/translations/default-language').then((resp) => resp.json()),
  ]).then((resps) => setState({
    languages: resps[0],
    defaultLanguage: resps[1],
  })), []);

  return (
    <DashboardPage>
      {
        state.languages.map((lng) => (
          <p key={lng}>
            <Suspense fallback={lng}>
              <Translation>
                {(t) => (
                  <Typography>
                    {t(`Language:language_${lng}`)}
                  </Typography>
                )}
              </Translation>
            </Suspense>
            {' '}
            {(lng === state.defaultLanguage) && '*'}
          </p>
        ))
      }
    </DashboardPage>
  );
}
