import React from 'react';
import { Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import Pagination from './Pagination.jsx';
import List from './List.jsx';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    typography: {
        letterSpacing: '0.1em'
    }
}));

export default function (props) {

    const classes = useStyles();

    return (
        <>
            {/* Cantida de pokemons */}
            <Grid container justify="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.typography} variant="caption" display="block">
                        Existen {props.count} Pokémons
                    </Typography>
                </Grid>
            </Grid>
            {/* Lista */}
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <List {...props} />
                    </Paper>
                </Grid>
            </Grid>
            {/* Paginado */}
            <Grid container justify="center" spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Pagination {...props} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}