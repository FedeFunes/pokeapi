
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Select, FormControl, InputLabel, Button, withStyles } from '@material-ui/core';
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
  },
  "outlined": {
    padding: '8px 14px'
  }, 
  select: {
    fontSize: '0.7rem'  
  }
}));

const Language = {
  spanish: { code: 'es', desc: 'Spanish' },
  english: { code: 'en', desc: 'English' },
  french: { code: 'fr', desc: 'French' },
  italian: { code: 'it', desc: 'Italian' },
  japanese: { code: 'ja', desc: 'Japanese' },
  korean: { code: 'ko', desc: 'Korean' },
  german: { code: 'de', desc: 'German' },
};

const MySelect = (props) => {

  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [])

  function handleChange(evt) {
    props.setCurrentPage(parseInt(evt.target.value));
  }

  return (
    <FormControl 
      fullWidth 
      variant="outlined"
    >
      <InputLabel ref={inputLabel}>{props.label}</InputLabel>
      <Select
        fullWidth
        native
        className={classes.select}
        classes={{ outlined: classes.outlined}}
        value={props.value}
        onChange={props.onChange}
        labelWidth={labelWidth}
      >
        {props.children}
      </Select>
    </FormControl>
  );
}

export default function ({ setSelectedItem, getPokemon, selectedItem }) {

  const classes = useStyles();
  let { name } = useParams();
  const [language, setLanguage] = useState('es')

  useEffect(() => {
    getPokemon(name, language).then(pokemon => {
      setSelectedItem(pokemon);
    });

    return function () {
      // Reseteo selectedItem
      setSelectedItem({
        abilities: [],
        images: []
      });
    }
  }, [name, setSelectedItem, getPokemon, language]);

  function handleChange(evt) {
      setLanguage(evt.target.value);
    }

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
              Abilities
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
          <Grid container justify="flex-end" spacing={3} p={5}>
            <Grid item xs={6} sm={3}>
              <MySelect label={''} onChange={handleChange} value={null} >
                {
                  Object.values(Language).map((e, i) => {
                    return <option value={e.code} key={e.code}>{e.desc}</option>
                  })
                }
              </MySelect>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}