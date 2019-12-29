import React from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import SelectCustom from './SelectCustom';

const useStyles = makeStyles(() => ({
    button: {
        height: '100%'
    },
    select: {
        textAlign: 'center'
    }
}));

const Pbttn = (props) => {

    const classes = useStyles();

    return (
        <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={props.onClick}
            className={classes.button}
        >
            {props.text}
        </Button>
    )
}

export default function (props) {

    const classes = useStyles();

    // Aumenta 1 pag
    function oneMore() {
        if (props.currentPage <= props.numberPages)
            props.setCurrentPage(props.currentPage + 1);
    }

    // Resta 1 pag
    function oneLess() {
        if (props.currentPage > 1)
            props.setCurrentPage(props.currentPage - 1);
    }

    function handleChange(evt) {
        props.setCurrentPage(parseInt(evt.target.value));
    }

    return (
        <Grid container spacing={1}>
            {/* Boton Atras */}
            <Grid item xs={4}>
                <Pbttn text="Atrás" onClick={oneLess} />
            </Grid>
            {/* Paginas */}
            <Grid item xs={4}>
                <SelectCustom
                    label={'Page'}
                    onChange={handleChange}
                    value={props.currentPage}
                    classes={{ select: classes.select }}
                >
                    {
                        (() => {
                            let options = [];
                            let value = null;

                            for (let i = 0; i < props.numberPages; i++) {
                                value = i + 1;
                                options.push(<option value={value} key={value}>{value}</option>);
                            }

                            return options;
                        })()
                    }
                </SelectCustom>
            </Grid>
            {/* Boton Siguiente */}
            <Grid item xs={4}>
                <Pbttn text="Siguiente" onClick={oneMore} />
            </Grid>
        </Grid>
    );
}