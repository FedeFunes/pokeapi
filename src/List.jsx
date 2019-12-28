import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import capitalize from 'lodash/capitalize';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        border: '1px lightgray solid'
    },
    img: {
        height: '150%'
    }
}));

function MListItemAvatar({ item, to }) {

    const classes = useStyles();

    return (
        <ListItem button to={to} component={Link}>
            <ListItemAvatar>
                <Avatar
                    alt={`Avatar ${item.name}`}
                    src={item.sprites.frontDefault}
                    className={classes.avatar}
                    classes={{ img: classes.img }}
                />
            </ListItemAvatar>
            <ListItemText primary={capitalize(item.name)} />
        </ListItem>
    );
}

export default function ({ currentItems }) {

    const classes = useStyles();

    return (
        <List dense className={classes.root}>
            {currentItems.map((e, i) => {
                return (
                    <MListItemAvatar key={i} item={e} to={`/pokemon/${e.name}`} />
                );
            })}
        </List>
    );
}
