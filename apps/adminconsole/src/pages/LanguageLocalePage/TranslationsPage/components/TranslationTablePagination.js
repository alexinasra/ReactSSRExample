import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// Table Components
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

// Input Components
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

// User Components
import TranslationTablePaginationActions from './TranslationTablePaginationActions';

const CREATE_KEY = gql`
mutation ($key: String! $ns: String!) {
  i18nSetTranslation(key: $key ns:$ns value:"")
}
`;

export default function TranslationTablePagination(props) {
  const [value, setValue] = useState('');
  const {
    page, rowsCount, rowsPerPage, onChangePage, ns, onChangeRowsPerPage, onKeyAdd,
  } = props;
  const [createKey] = useMutation(CREATE_KEY);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleSaveButtonClick = async () => {
    await createKey({ variables: { ns, key: value } });
    onKeyAdd(value);
    setValue('');
  };

  return (
    <Table>
      <TableRow>
        <TableCell>
          <FormControl>
            <Input
              id="new_row"
              value={value}
              onChange={handleChangeValue}
              variant="outlined"
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    disabled={value === ''}
                    onClick={handleSaveButtonClick}
                  >
                    <Add />
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
        </TableCell>
        <TablePagination
          color="secondary"
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={rowsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          ActionsComponent={TranslationTablePaginationActions}
        />
      </TableRow>
    </Table>
  );
}
