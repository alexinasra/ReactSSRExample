import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
// import { gql, useMutation } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TranslationValue from './TranslationValue';
import EditTranslationValue from './EditTranslationValue';

export default function EditTranslationPage() {
  const { namespace, key } = useParams();

  return (
    <Grid component={Paper} container>
      <Grid item sm={12}>

        <Typography variant="h4">
          <Link
            component={RouterLink}
            to={`/translations/${namespace}`}
          >
            {namespace}
          </Link>
          {` : ${key}`}
        </Typography>
      </Grid>
      <TranslationValue
        translationNs={namespace}
        translationKey={key}
        translationLanguage="en"
      >
        {({ actualValue, value }) => (
          <>
            <Grid item sm={2}>
              <Typography>
                en
              </Typography>
            </Grid>
            <Grid item sm={5}>
              <EditTranslationValue
                autoFocus
                required
                translationNs={namespace}
                translationKey={key}
                translationActualValue={actualValue}
                translationLanguage="en"
              />
            </Grid>
            <Grid item sm={5}>
              {value}
            </Grid>
          </>
        )}
      </TranslationValue>
      <TranslationValue
        translationNs={namespace}
        translationKey={key}
        translationLanguage="ar"
      >
        {({ actualValue, value }) => (
          <>
            <Grid item sm={2}>
              <Typography>
                ar
              </Typography>
            </Grid>
            <Grid item sm={5}>
              <EditTranslationValue
                translationNs={namespace}
                translationKey={key}
                translationActualValue={actualValue}
                translationLanguage="ar"
              />
            </Grid>
            <Grid item sm={5}>
              {value}
            </Grid>
          </>
        )}
      </TranslationValue>
      <TranslationValue
        translationNs={namespace}
        translationKey={key}
        translationLanguage="he"
      >
        {({ actualValue, value }) => (
          <>
            <Grid item sm={2}>
              <Typography>
                he
              </Typography>
            </Grid>
            <Grid item sm={5}>
              <EditTranslationValue
                translationNs={namespace}
                translationKey={key}
                translationActualValue={actualValue}
                translationLanguage="he"
              />
            </Grid>
            <Grid item sm={5}>
              {value}
            </Grid>
          </>
        )}
      </TranslationValue>
    </Grid>

  );
}
