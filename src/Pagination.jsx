import React from 'react';
import { Select, FormControl, InputLabel, Grid, Button, makeStyles } from '@material-ui/core';

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
        <FormControl fullWidth variant="outlined">
            <InputLabel ref={inputLabel}>{props.label}</InputLabel>
            <Select
                fullWidth
                classes={{ select: classes.select }}
                native
                value={props.value}
                onChange={props.onChange}
                labelWidth={labelWidth}
            >
                {props.children}
            </Select>
        </FormControl>
    );
}

export default function (props) {

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
                <MySelect label={'Page'} onChange={handleChange} value={props.currentPage}>
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
                </MySelect>
            </Grid>
            {/* Boton Siguiente */}
            <Grid item xs={4}>
                <Pbttn text="Siguiente" onClick={oneMore} />
            </Grid>
        </Grid>
    );
}