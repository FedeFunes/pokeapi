import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
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
            <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">Page</InputLabel>
            <Select
                fullWidth
                classes={{ select: classes.select }}
                native
                value={props.currentPage}
                onChange={handleChange}
                labelWidth={labelWidth}
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
            </Select>
        </FormControl>
    );
}

export default function (props) {

    function oneMore() {
        if (props.currentPage <= props.numberPages) 
            props.setCurrentPage(props.currentPage + 1);
    }

    function oneLess() {
        if (props.currentPage > 1) 
            props.setCurrentPage(props.currentPage - 1);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={4} sm={5}>
                <Pbttn text="Atrás" onClick={oneLess} />
            </Grid>
            <Grid item xs={4} sm={2}>
                <MySelect {...props} />
            </Grid>
            <Grid item xs={4} sm={5}>
                <Pbttn text="Siguiente" onClick={oneMore} />
            </Grid>
        </Grid>
    );
}