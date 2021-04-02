import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  textfield: {
    flex: '4',
  },
  select: {
    flex: '1',
  },
}));

const CREATE_NS = gql`
mutation ($ns: String!) {
  i18nCreateNamespace(ns: $ns)
}
`;

export default function TranslationTableToolbar(props) {
  const {
    onNamespaceAdd, ns, onNamespaceChange, namespaces,
  } = props;
  const [value, setValue] = useState('');
  // const [selected, setSelected] = useState(namespaces[ns]);
  const classes = useToolbarStyles();
  const [createNamespace] = useMutation(CREATE_NS);

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  const handleChangeNamespace = (e) => {
    // setSelected(e.target.value);
    onNamespaceChange(e.target.value);
  };
  const handleButtonClick = async () => {
    await createNamespace({ variables: { ns: value } });
    setValue('');
    onNamespaceAdd(value);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: true,
      })}
    >
      <FormControl className={classes.textfield}>
        <TextField
          value={value}
          onChange={handleChangeValue}
          fullWidth
        />
      </FormControl>
      <FormControl>
        <Button disabled={!value} onClick={handleButtonClick}>Add Namespace</Button>
      </FormControl>
      <FormControl variant="outlined" className={classes.select}>
        <Select
          value={ns}
          onChange={handleChangeNamespace}
        >
          {
            namespaces.map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)
          }
        </Select>
      </FormControl>
    </Toolbar>
  );
}
