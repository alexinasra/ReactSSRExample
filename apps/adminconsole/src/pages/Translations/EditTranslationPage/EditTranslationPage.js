import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import EditBreadcrumbs from './EditBreadcrumbs';
import EditSection from './EditSection';
import EditTranslationValue from './EditTranslationValue';
import TranslationValue from '../TranslationValue';
import TextPreview from './TextPreview';

const renderValueLoader = () => (
  <Skeleton width="90%" height="120px" variant="text" />
);

export default function EditTranslationPage() {
  const { namespace, key } = useParams();
  const { i18n } = useTranslation('Language', {
    useSuspense: false,
  });
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const mainLanguage = 'en';
  const otherLanguages = React.useMemo(
    () => i18n.options.languages.filter((l) => l !== mainLanguage),
    [],
  );
  return (
    <TranslationValue
      translationNs={namespace}
      translationKey={key}
      translationLanguage={mainLanguage}
      renderLoading={renderValueLoader}
    >
      {({ actualValue, value }) => (
        <Stack
          component={Paper}
          sx={{
            px: (theme) => theme.spacing(4),
            py: (theme) => theme.spacing(3),
          }}
        >
          <EditBreadcrumbs namespace={namespace} tkey={key} />
          <Stack>
            <TextPreview
              value={value}
              dir={i18n.dir(mainLanguage)}
            />
            <TextPreview
              label="Actual Value"
              value={actualValue}
              dir={i18n.dir(mainLanguage)}
            />
            <EditTranslationValue
              autoFocus
              required
              translationNs={namespace}
              translationKey={key}
              translationActualValue={actualValue}
              translationLanguage={mainLanguage}
            />
          </Stack>
          {
          otherLanguages.map((l) => (
            <EditSection
              namespace={namespace}
              key={l}
              expanded={l === expanded}
              onChange={handleChange}
              tkey={key}
              language={l}
              mainLanguage={mainLanguage}
              mainValue={value}
              mainActualValue={actualValue}
            />
          ))
        }
        </Stack>
      )}
    </TranslationValue>

  );
}
