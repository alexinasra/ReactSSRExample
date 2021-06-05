import React from 'react';
import { gql, useQuery } from '@apollo/client';

const TRANSLATION_VALUE = gql`
query (
  $namespace: String
  $language: String
  $key: String
){
  i18nTranslationValue (
    namespace: $namespace
    language: $language
    key: $key
  ){
    id
    translationKey {
      id
      namespace
      key
    }
    language
    value
    actualValue
  }
}
`;

export default function TranslationValue({
  translationNs,
  translationKey,
  translationLanguage,
  children,
}) {
  const {
    data, loading, error,
  } = useQuery(TRANSLATION_VALUE, {
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
