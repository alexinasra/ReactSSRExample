import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  root: {}
}))

export default function CoverSelect({
  value,
  onChange
}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>

    </div>
  )
}
