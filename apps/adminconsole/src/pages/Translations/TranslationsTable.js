import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import GqlQuery from '@react-ssrex/ui/build/GqlQuery';
import Skeleton from '@mui/material/Skeleton';

import TranslationValue from './TranslationValue';
import { TranslationsTableQuery } from '../../schema.graphql';
import DeleteKeyDialog from './DeleteKeyDialog';

const TableContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TableSection = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderBottom: '1px solid',
}));

const TableRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const TableKeyColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  paddingLeft: theme.spacing(2),
  width: theme.spacing(24),
  alignItems: 'center',
  height: 48,
  flexGrow: 1,
}));
const TableActionColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.spacing(12),
  height: 48,
}));
const TableValueColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.spacing(46),
  height: 48,
}));

const TableTitleColumn = styled(TableValueColumn)({
});

const renderLoading = () => (
  <TableContainer>
    <TableSection>
      <TableRow>
        <Skeleton width="100%" height={40} variant="text" />
      </TableRow>
    </TableSection>
    <TableSection>
      <TransitionGroup>
        {[...Array(10).keys()].map((k) => (
          <Collapse key={k}>
            <TableRow>
              <Skeleton width="100%" height={40} variant="text" />
            </TableRow>
          </Collapse>
        ))}
      </TransitionGroup>
    </TableSection>
  </TableContainer>
);

export default function TranslationsTable() {
  const { namespace } = useParams();
  const [deleteKey, setDeleteKey] = React.useState(false);
  const { t } = useTranslation('Language', { useSuspense: false });

  return (
    <GqlQuery
      query={TranslationsTableQuery}
      variables={{ namespace }}
      renderLoading={renderLoading}
    >
      {(data) => (
        <TableContainer>
          <TableSection>
            <TableRow>
              <TableActionColumn />
              <TableKeyColumn>
                {namespace}
              </TableKeyColumn>
              <TableTitleColumn>
                {t('language_en')}
              </TableTitleColumn>
              {data.languages.filter((l) => l.short !== 'en').map((l) => (
                <TableTitleColumn key={l.short}>
                  {t(`language_${l.short}`)}
                </TableTitleColumn>
              ))}
            </TableRow>
          </TableSection>
          <TableSection>
            <TransitionGroup>
              {
          data.i18nTranslationKeys.map((translationKey) => (
            <Collapse key={translationKey.id}>
              <TableRow>
                <TableActionColumn>
                  <IconButton onClick={() => setDeleteKey(translationKey)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton to={`/translations/${namespace}/edit/${encodeURIComponent(translationKey.key)}`} component={Link}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableActionColumn>
                <TableKeyColumn>
                  {translationKey.key}
                </TableKeyColumn>
                <TableValueColumn id={`${translationKey.id}_en`}>
                  <TranslationValue
                    translationNs={translationKey.namespace}
                    translationKey={translationKey.key}
                    translationLanguage="en"
                    renderLoading={() => (<Skeleton width="90%" variant="text" />)}
                  >
                    {({ value }) => (
                      <bdi dir="ltr">
                        <Typography>
                          {value}
                        </Typography>
                      </bdi>
                    )}
                  </TranslationValue>
                </TableValueColumn>
                {
                  data.languages.filter((l) => l.short !== 'en').map((l) => (
                    <TableValueColumn
                      id={`${translationKey.id}_${l.short}`}
                      key={`${translationKey.id}_${l.short}`}
                    >
                      <TranslationValue
                        translationNs={translationKey.namespace}
                        translationKey={translationKey.key}
                        translationLanguage={l.short}
                      >
                        {({ value }) => (
                          <bdi dir={l.dir}>
                            <Typography>
                              {value}
                            </Typography>
                          </bdi>
                        )}
                      </TranslationValue>
                    </TableValueColumn>
                  ))
                }
              </TableRow>
            </Collapse>
          ))
        }
            </TransitionGroup>
          </TableSection>
          <DeleteKeyDialog
            translationKey={deleteKey}
            onError={console.log}
            onConfirm={() => { setDeleteKey(false); }}
            onCancel={() => setDeleteKey(false)}
          />
        </TableContainer>
      )}
    </GqlQuery>
  );
}
