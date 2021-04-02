/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import flattenkeys from 'flattenkeys';

import TranslationTableToolbar from './TranslationTableToolbar';
import TranslationTablePagination from './TranslationTablePagination';
import TranslationTableHead from './TranslationTableHead';
import TranslationTableBody from './TranslationTableBody';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  container: {
    height: 520,
  },
  tableKey: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const NS_KEYS = gql`
query ($ns: String!) {
  i18nNamespaceKeys(ns: $ns)
}
`;

const DROP_KEY = gql`
mutation ($key: String! $ns: String!) {
  i18nDropTranslation(key: $key ns:$ns)
}
`;

export default function TranslationTable({
  ns, languages, namespaces, onNamespaceAdd, onNamespaceChange,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { i18n } = useTranslation(null, { useSuspense: false });
  const {
    loading, error, data, refetch,
  } = useQuery(NS_KEYS, { variables: { ns } });
  const [dropKey] = useMutation(DROP_KEY);

  const keys = useMemo(() => (!loading && data ? data.i18nNamespaceKeys : []), [loading, data, ns]);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const handleSaveButtonClick = async (newKey) => {
    await i18n.reloadResources(languages, [ns]);
    refetch();
  };

  const handleDeleteButtonClick = async (key) => {
    await dropKey({ variables: { ns, key } });
    await i18n.reloadResources(languages, [ns]);
    refetch();
  };

  if (error) {
    return (<pre>{JSON.stringify(error, null, '\t')}</pre>);
  }

  return (
    <Paper className={classes.root}>
      <TranslationTableToolbar
        ns={ns}
        namespaces={namespaces || []}
        onNamespaceAdd={onNamespaceAdd}
        onNamespaceChange={onNamespaceChange}
      />

      <TableContainer className={classes.container}>

        <Table aria-label="simple table">
          <TranslationTableHead
            title={ns}
            languages={languages}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsCount={keys.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <TranslationTableBody
            ns={ns}
            keys={keys}
            languages={languages}
            page={page}
            rowsPerPage={rowsPerPage}
            onDeleteButtonClick={handleDeleteButtonClick}
          />
        </Table>
      </TableContainer>
      <TranslationTablePagination
        onKeyAdd={handleSaveButtonClick}
        ns={ns}
        page={page}
        rowsCount={keys.length}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
