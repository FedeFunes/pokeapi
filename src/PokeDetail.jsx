
import React, { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import { Select, FormControl, InputLabel, Grid, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import Images from './Images.jsx';
import capitalize from 'lodash/capitalize';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '90%',
    margin: '20px auto 0px'
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
  typography: {
    letterSpacing: '0.1em'
  },
  hola: {
    // padding: theme.spacing(1)
    padding: '0px 8px 8px 8px'
  }
}));

export default function Pokemon({ setSelectedItem, getPokemon, selectedItem }) {

  const classes = useStyles();
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { name } = useParams();

  useEffect(() => {
    getPokemon(name).then(pokemon => {
      setSelectedItem(pokemon);
    });
  }, [name, setSelectedItem, getPokemon]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" style={{ fontWeight: '300', paddingBottom: '15px' }}>
            {capitalize(name)}
          </Typography>
          <Images src={selectedItem.images} />
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <Typography variant="overline" style={{ fontSize: '0.9rem' }}>
              Habilidades
            </Typography>
          </div>
          {
            selectedItem.abilities.map((e, i) => {
              return (
                <React.Fragment key={i}>
                  <div className={classes.hola}>
                    <Typography variant="subtitle2" style={{ color: 'gray' }}>
                      {e.names.name}
                    </Typography>
                    <Typography variant='caption' display="inline">
                      {e.flavor_text_entries.flavor_text}
                    </Typography>
                  </div>
                </React.Fragment>
              );
            })
          }
        </Paper>
      </Grid>
    </Grid>
  );
}