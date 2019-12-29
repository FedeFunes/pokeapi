import React from 'react';
import { Select, FormControl, InputLabel } from '@material-ui/core';

export default (props) => {

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, [])

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel ref={inputLabel}>{props.label}</InputLabel>
            <Select
                fullWidth
                native
                classes={props.classes}
                style={props.style}
                value={props.value}
                onChange={props.onChange}
                labelWidth={labelWidth}
                className={props.className}
            >
                {props.children}
            </Select>
        </FormControl>
    );
}