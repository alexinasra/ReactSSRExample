import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ImageDialog from '@foodle/ui/build/ImageDialog';
import Page from '../../layout/Page';
import RestaurantCover from '../../components/RestaurantCover';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  header: {
    position: 'relative',
    boxSizing: 'border-box',
    padding: 0,
  },
  wallImage: {
    borderRadius: theme.shape.borderRadius,
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('md')]: {
      width: 640,
      height: 360,
    },
    [theme.breakpoints.up('lg')]: {
      width: 820,
      height: 312,
    },
  },
  logoContainer: {
    width: '128px',
  },
  logoImage: {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  formContainer: {
    padding: theme.spacing(3),
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <Grid container justify="center" spacing={8}>
        <Grid item>
          <Paper className={classes.header}>
            <RestaurantCover />
            <ImageDialog />
          </Paper>
        </Grid>
        <Grid item sm={12} md={12} lg={8}>
          <Paper className={classes.formContainer} variant="outlined">
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Restaurant Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      variant="outlined"
                      label="Restaurant Description"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Paper variant="outlined" className={classes.logoContainer}>
                  <img className={classes.logoImage} src="/assets/restaurants/default-logo.png" alt="restaurant logo" />
                </Paper>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Is Kosher"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Is Halal"
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  label="email"
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="tel"
                  label="Phone number"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={7}>
          <Button color="primary" variant="contained">Next</Button>
        </Grid>
      </Grid>
    </Page>
  );
}
