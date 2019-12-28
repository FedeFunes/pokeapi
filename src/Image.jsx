import React from 'react';
import { makeStyles, GridList, GridListTile } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  tile: {
    border: '1px lightgray solid',
    borderRadius: '25px'
  }
}));

export default function SingleLineGridList({ src }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={100} cols={4}>
        {
          src.map((e, i) => {
            return (
              <GridListTile classes={{ tile: classes.tile }} key={i}>
                <img src={e} alt={''} />
              </GridListTile>
            );
          }).reverse()
        }
      </GridList>
    </div>
  );
}
