import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

export default function PollOptionsInput({
  options = [],
  onAdd = () => {},
  onRemove = () => {},
  onChange = () => {},
}) {
  const [selected, setSelected] = React.useState('');
  const [tmpVal, setTmpVal] = React.useState('');
  const [newVal, setNewVal] = React.useState('');

  const handleOptionUnselect = () => {
    setSelected('');
    setTmpVal('');
  };
  const handleOptionChange = (e) => {
    if (e.key === 'Enter') {
      onChange(selected, tmpVal);
      setTimeout(() => {
        setSelected('');
        setTmpVal('');
      }, 10);
      return e.preventDefault();
    }
    if (e.key === 'Escape') {
      handleOptionUnselect();
      return e.preventDefault();
    }
    return false;
  };
  const handleTmpChange = (e) => {
    const { value } = e.target;
    setTmpVal(value);
  };

  const handleOptionSelect = (o) => () => {
    setSelected('');
    setTmpVal(o);
    setTimeout(() => {
      setSelected(o);
    }, 10);
  };

  const handleNewChange = (e) => {
    const { value } = e.target;
    setNewVal(value);
  };

  const handleNewAdd = () => {
    onAdd(newVal);
    setTimeout(() => {
      setNewVal('');
    }, 10);
  };

  const handleNewKeyUp = (e) => {
    if (e.key === 'Enter') {
      onAdd(newVal);
      setTimeout(() => {
        setNewVal('');
      }, 10);
      return e.preventDefault();
    }
    if (e.key === 'Escape') {
      setNewVal('');
      return e.preventDefault();
    }
    return false;
  };

  return (
    <Grid container>
      {
        options.map((o, idx) => (
          <Grid key={o} item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ paddingRight: (theme) => theme.spacing(1) }}>{`${idx + 1}. `}</Typography>
            {o === selected ? (
              <TextField
                onChange={handleTmpChange}
                onKeyUp={handleOptionChange}
                onBlur={handleOptionUnselect}
                autoFocus
                value={tmpVal}
                fullWidth
              />
            ) : (
              <Typography sx={{ flexGrow: 1 }} onDoubleClick={handleOptionSelect(o)}>
                {o}
              </Typography>
            )}
            <IconButton onClick={() => onRemove(o)}><Icon>clear</Icon></IconButton>
          </Grid>
        ))
      }
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ paddingRight: (theme) => theme.spacing(1) }}>{'*. '}</Typography>
        <TextField
          onChange={handleNewChange}
          onKeyUp={handleNewKeyUp}
          autoFocus
          value={newVal}
          fullWidth
        />
        <IconButton onClick={handleNewAdd}><Icon>add</Icon></IconButton>
      </Grid>
    </Grid>
  );
}
