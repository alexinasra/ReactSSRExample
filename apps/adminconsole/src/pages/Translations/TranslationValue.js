import React from 'react';
import GqlQuery from '@react-ssrex/ui/build/GqlQuery';
import Fade from '@mui/material/Fade';
import { I18nTranslationValueQuery } from '../../schema.graphql';

export default function TranslationValue({
  translationNs,
  translationKey,
  translationLanguage,
  renderLoading,
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
      renderLoading={renderLoading}
    >
      {({ i18nTranslationValue }) => (
        <Fade in>
          <span>{children(i18nTranslationValue)}</span>
        </Fade>
      )}
    </GqlQuery>
  );
}
