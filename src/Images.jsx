import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';

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
  title: {
    color: theme.palette.primary.light,
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
