import React from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditTranslationValue from './EditTranslationValue';
import TranslationValue from '../TranslationValue';
import TextPreview from './TextPreview';

const Sample = styled(Box)({
  flexGrow: 1,
});

const renderValueLoader = () => (
  <Skeleton width="90%" height="120px" variant="text" />
);
export default function EditSection({
  namespace,
  tkey,
  language,
  mainLanguage,
  mainValue,
  mainActualValue,
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
          sx={{
            my: 2,
          }}
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
            <Box sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'space-evenly',
            }}
            >
              <Sample>
                <TextPreview
                  value={value}
                  dir={i18n.dir(language)}
                />
                <TextPreview
                  label="Actual Value"
                  value={actualValue}
                  dir={i18n.dir(language)}
                />
              </Sample>
              <Sample>
                <TextPreview
                  value={mainValue}
                  dir={i18n.dir(mainLanguage)}
                />
                <TextPreview
                  label="Actual Value"
                  value={mainActualValue}
                  dir={i18n.dir(mainLanguage)}
                />
              </Sample>
            </Box>
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
