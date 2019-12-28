
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Image from './Image.jsx';
import capitalize from 'lodash/capitalize';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
  ability: {
    padding: '0px 8px 8px 8px'
  },
  name: {
    fontWeight: '300',
    paddingBottom: '15px'
  },
  abilityName: {
    color: 'gray'
  },
  abilityTitle: {
    fontSize: '0.9rem',
    lineHeight: '0'
  },
  abilityTitleWrapper: {
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '7px'
  }
}));

export default function ({ setSelectedItem, getPokemon, selectedItem }) {

  const classes = useStyles();
  let { name } = useParams();

  useEffect(() => {
    getPokemon(name).then(pokemon => {
      setSelectedItem(pokemon);
    });

    return function () {
      console.log('hola');
      setSelectedItem({
        abilities: [],
        images: []
      });
    }
  }, [name, setSelectedItem, getPokemon]);

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.name}>
            {capitalize(name)}
          </Typography>
          <Image src={selectedItem.images} />
          <div className={classes.abilityTitleWrapper}>
            <Typography variant="overline" className={classes.abilityTitle}>
              Habilidades
            </Typography>
          </div>
          {
            selectedItem.abilities.map((e, i) => {
              return (
                <React.Fragment key={i}>
                  <div className={classes.ability}>
                    <Typography variant="subtitle2" className={classes.abilityName}>
                      {e.names.name}
                    </Typography>
                    <Typography variant="caption">
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