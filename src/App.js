import React from 'react';
import PokeList from './PokeList.jsx';
import { makeStyles, Grid } from '@material-ui/core';

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
			<Grid container justify="center" spacing={3}>
				<Grid item xs={6} sm={3}>
					{/* LOGO */}
					<img src="International_Pokémon_logo.svg" alt="Pokelogo" width="100%" />
				</Grid>
			</Grid>
			<PokeList />
		</div>
	);
}

export default App;
