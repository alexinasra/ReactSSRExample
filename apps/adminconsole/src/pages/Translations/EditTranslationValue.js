import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';

import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const UPDATE_TRANSLATION = gql`
mutation ($input: UpdateI18nTranslationInput) {
  updateI18nTranslation(input: $input) {
    updated
    translationValues {
      id
      translationKey {
        id
        namespace
        key
      }
      language
      value
      actualValue
    }
  }
}
`;

export default function EditTranslationValue({
  autoFocus = false,
  required = false,
  translationNs,
  translationLanguage,
  translationKey,
  translationActualValue,
}) {
  const [value, setValue] = useState(translationActualValue || '');
  const { i18n } = useTranslation([], { useSuspense: false });
  const [updateTranslationValue] = useMutation(UPDATE_TRANSLATION);

  const handleValueChange = (e) => setValue(e.target.value);

  const handleSave = (e) => {
    e.preventDefault();
    if (e.target.reportValidity()) {
      updateTranslationValue({
        variables: {
          input: {
            namespace: translationNs,
            key: translationKey,
            language: translationLanguage,
            value,
          },
        },
      }).catch(console.log);
    }
  };
  return (
    <form onSubmit={handleSave}>
      <bdi dir={i18n.dir(translationLanguage)}>
        <TextareaAutosize
          autoFocus={autoFocus}
          required={required}
          value={value}
          onChange={handleValueChange}
          aria-label="empty textarea"
          placeholder="Empty"
          rows={5}
        />
      </bdi>
      <Button type="submit">
        Save
      </Button>
      <Button>
        Cancel
      </Button>
    </form>
  );
}
