import React, { useState, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import LayoutPage from '@react-ssrex/ui/build/LayoutPaperPage';

// this is very old implementation it can be improved for sure ..
import TranslationTable from './components/TranslationTable';

const TRANSLATIONS_PAGE = gql`
query {
  languages {
    short
  }
  i18nNamespaces
}
`;

export default function TranslationsPage() {
  const { i18n } = useTranslation([], { useSuspense: false });
  const {
    loading, error, data, refetch,
  } = useQuery(TRANSLATIONS_PAGE);
  const { languages, ns, defaultNS } = useMemo(
    () => (
      (!loading && data) ? {
        languages: data.languages.map((l) => l.short),
        ns: data.i18nNamespaces || [],
      } : {
        languages: ['en'],
        ns: ['common'],
        defaultNS: 'common',
      }
    ), [loading, data],
  );
  if (error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }
  const [selectedNs, setSelectedNs] = useState(defaultNS);
  const handleNsChange = (namespace) => {
    setSelectedNs(namespace);
  };

  const handleNamespaceAdd = async (namespace) => {
    await refetch();
    await i18n.loadNamespaces([namespace]);
    setTimeout(() => setSelectedNs(namespace), 300);
  };

  if (error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }
  return (
    <LayoutPage>
      <TranslationTable
        ns={selectedNs}
        namespaces={ns}
        languages={languages}
        onNamespaceAdd={handleNamespaceAdd}
        onNamespaceChange={handleNsChange}
      />
    </LayoutPage>
  );
}
