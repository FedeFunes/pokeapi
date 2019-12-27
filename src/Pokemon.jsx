
import React, { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import { Select, FormControl, InputLabel, Grid, Button, makeStyles, Paper, Typography} from '@material-ui/core';
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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    typography: {
        letterSpacing: '0.1em'
    }
}));

export default function Pokemon({ setSelectedItem, getPokemon, selectedItem }) {

  const classes = useStyles();
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { name } = useParams();

  // function updateSelectedItems(item) {
  //   setSelectedItems([...selectedItems, item]);
  // }

  useEffect(() => {
    getPokemon(name).then(pokemon => {
        setSelectedItem(pokemon);
        // updateSelectedItems(pokemon);
    });  
  }, [name, setSelectedItem, getPokemon]);

  return (
    <Grid container justify="center" spacing={3}>
        <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <Typography variant="h4">
        {capitalize(name)}
      </Typography>
                <Images src={selectedItem.images}/>
                <Typography variant="h5">
        Habilidades
      </Typography>
        {
              selectedItem.abilities.map((e,i) => {
                return (
                  <React.Fragment key={i}>
                   <Typography variant="h6">
        {e.names.name}
      </Typography>
      <Typography variant='body1'>
        {e.flavor_text_entries.flavor_text}
      </Typography>
                  </React.Fragment>
                  );
              })
            }
            </Paper>
            
        </Grid>
    </Grid>
  );
}