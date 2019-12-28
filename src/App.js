import React from 'react';
import PokeList from './PokeList.jsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '90%',
		margin: '20px auto 0px'
	}
}));

function App() {

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<PokeList />
		</div>
	);
}

export default App;
