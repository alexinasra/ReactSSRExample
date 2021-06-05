import React from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const TRANSLATIONS_PAGE = gql`
query {
  i18nNamespaces
}
`;
export default function SelectNamespace() {
  const { namespace } = useParams();

  const {
    data,
    error,
    loading,
    refetch,
  } = useQuery(TRANSLATIONS_PAGE);
  const { push } = useHistory();

  React.useEffect(() => {
    if (data && !data.i18nNamespaces.includes(namespace)) {
      refetch();
    }
  }, [namespace, data]);

  if (loading) {
    return (
      <p>loading</p>
    );
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, '\n')}</pre>);
  }
  return (
    <FormControl fullWidth>
      <Select
        value={namespace}
      >
        {
          data.i18nNamespaces.map((n) => <MenuItem key={n} value={n} onClick={() => push(`/translations/${n}`)}>{n}</MenuItem>)
        }
      </Select>
    </FormControl>
  );
}
