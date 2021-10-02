import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PollOptionsInput from './PollOptionsInput';

export default function CreateForm({
  defaultValues = { subject: '', options: ['double click me to edit'] },
  submitText = 'Create',
  resetText = 'Clear',
  onSubmit = () => {},
  onReset = () => {},
}) {
  const [subject, setSubject] = React.useState(defaultValues.subject);
  const [options, setOptions] = React.useState(defaultValues.options);

  const handleSubmit = () => {
    onSubmit({
      subject,
      options,
    });
  };
  const handleSubjectChange = (e) => {
    const { value } = e.target;
    setSubject(value);
  };
  const handleReset = () => {
    setSubject(defaultValues.subject || '');
    setOptions(defaultValues.options || []);
    onReset();
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <Typography variant="title">
          Create new Poll
        </Typography>
      </Grid>
      <Grid item xs={12} md={10}>
        <TextField value={subject} onChange={handleSubjectChange} label="subject" fullWidth />
      </Grid>
      <Grid item xs={10} md={8}>
        <PollOptionsInput
          onChange={(oldVal, newVal) => {
            const idx = options.indexOf(oldVal);
            if (idx > -1) {
              const opt = [...options];
              opt[idx] = newVal;
              setOptions(opt);
            }
          }}
          onAdd={(o) => setOptions([...options, o])}
          onRemove={(o) => setOptions(options.filter((o1) => o1 !== o))}
          options={options}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" onClick={handleSubmit}>{submitText}</Button>
        <Button onClick={handleReset}>{resetText}</Button>
      </Grid>
    </Grid>
  );
}
