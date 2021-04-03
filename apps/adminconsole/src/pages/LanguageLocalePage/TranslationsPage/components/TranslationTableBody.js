import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import * as Styles from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Suspense from '@react-ssrex/ui/build/Suspense';
import TranslationValue from './TranslationValue';

export default function TranslationTableBody(props) {
  const classes = Styles.makeStyles({
    tableKey: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })();
  const {
    keys, page, rowsPerPage, languages, ns, onDeleteButtonClick,
  } = props;
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? keys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : keys
      ).map((key) => (
        <TableRow key={key}>
          <TableCell component="th" scope="row">
            <div className={classes.tableKey}>
              <span>
                {key}
              </span>
              <IconButton
                aria-label="delete"
                onClick={() => onDeleteButtonClick(key, ns)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </TableCell>
          {languages.map((lng) => (
            <TableCell key={`${lng}_${key}`} align="right">
              <Suspense fallback="loading">
                <TranslationValue tkey={key} ns={ns} lng={lng} />
              </Suspense>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
