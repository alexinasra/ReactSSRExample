import React from 'react';
import { useTranslation } from 'react-i18next';

import Skeleton from '@mui/material/Skeleton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditTranslationValue from './EditTranslationValue';
import TranslationValue from '../TranslationValue';
import TextPreview from './TextPreview';

const renderValueLoader = () => (
  <Skeleton width="90%" height="120px" variant="text" />
);
export default function EditSection({
  namespace,
  tkey,
  language,
  expanded,
  onChange,
}) {
  const { t, i18n } = useTranslation('Language', {
    useSuspense: false,
  });
  return (
    <TranslationValue
      translationNs={namespace}
      translationKey={tkey}
      translationLanguage={language}
      renderLoading={renderValueLoader}
    >
      {({ actualValue, value }) => (
        <Accordion
          TransitionProps={{ unmountOnExit: true }}
          expanded={expanded}
          elevation={0}
          onChange={onChange(language)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {t(`Language:language_${language}`)}
            </Typography>
            <Typography sx={{
              width: '100%',
              textAlign: 'center',
            }}
            >
              {value}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextPreview
              value={value}
              dir={i18n.dir(language)}
            />
            <TextPreview
              label="Actual Value"
              value={actualValue}
              dir={i18n.dir(language)}
            />
            <EditTranslationValue
              autoFocus
              required
              translationNs={namespace}
              translationKey={tkey}
              translationActualValue={actualValue}
              translationLanguage={language}
            />
          </AccordionDetails>
        </Accordion>
      )}
    </TranslationValue>
  );
}
