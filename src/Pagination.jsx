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

export default function ({ currentPage, setCurrentPage, numberPages }) {

    const classes = useStyles();

    // Aumenta 1 pag
    function oneMore() {
        if (currentPage <= numberPages)
            setCurrentPage(currentPage + 1);
    }

    // Resta 1 pag
    function oneLess() {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1);
    }

    function handleChange(evt) {
        setCurrentPage(parseInt(evt.target.value));
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
                    value={currentPage}
                    classes={{ select: classes.select }}
                >
                    {
                        (() => {
                            let options = [];
                            let value = null;

                            for (let i = 0; i < numberPages; i++) {
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