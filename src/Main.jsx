import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import Paginador from './Paginador.jsx';
import List from './List.jsx';

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

const MLogo = () => <img src="International_Pokémon_logo.svg.png" alt="Smiley face" width="100%" />;

export default function (props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={6} sm={3}>
                    <MLogo />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.typography} variant="caption" display="block" gutterBottom>
                        Estos son los 956 Pokémons
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <List {...props} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Paginador {...props}/>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
}