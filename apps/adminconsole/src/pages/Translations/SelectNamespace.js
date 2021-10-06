import React from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { I18nNamespacesQuery } from '../../schema.graphql';

export default function SelectNamespace() {
  const { namespace } = useParams();

  const {
    data,
    error,
    loading,
    refetch,
  } = useQuery(I18nNamespacesQuery);
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
