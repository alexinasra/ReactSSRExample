import React from 'react';
import { useQuery } from '@apollo/client';
import { I18nTranslationValueQuery } from '../../schema.graphql';

export default function TranslationValue({
  translationNs,
  translationKey,
  translationLanguage,
  children,
}) {
  const {
    data, loading, error,
  } = useQuery(I18nTranslationValueQuery, {
    variables: {
      namespace: translationNs,
      language: translationLanguage,
      key: translationKey,
    },
  });

  if (loading) {
    return (<p>loading</p>);
  }
  if (error) {
    return (
      <pre>
        {JSON.stringify(error, null, '\t')}
      </pre>
    );
  }
  return children(data.i18nTranslationValue);
}
