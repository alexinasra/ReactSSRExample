import React from 'react';
import GqlQuery from '@react-ssrex/ui/build/GqlQuery';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';
import { I18nTranslationValueQuery } from '../../schema.graphql';

export default function TranslationValue({
  translationNs,
  translationKey,
  translationLanguage,
  children,
}) {
  return (
    <GqlQuery
      query={I18nTranslationValueQuery}
      variables={{
        namespace: translationNs,
        language: translationLanguage,
        key: translationKey,
      }}
      renderLoading={() => (
        <Fade in>
          <Skeleton width="90%" variant="text" />
        </Fade>
      )}
    >
      {({ i18nTranslationValue }) => (
        <Fade in>
          <span>{children(i18nTranslationValue)}</span>
        </Fade>
      )}
    </GqlQuery>
  );
}
