import React from 'react';
import { Translation } from 'react-i18next';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Suspense from '@react-ssrex/ui/build/Suspense';

export default function TranslationTableHead(props) {
  const {
    title,
    languages,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell>{title}</TableCell>
        {
          languages.map((lng) => (
            <TableCell key={lng} align="right">
              <Suspense fallback={lng}>
                <Translation>
                  {
                    (t) => t(`Language:language_${lng}`)
                  }
                </Translation>
              </Suspense>
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  );
}
