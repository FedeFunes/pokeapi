import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListContainer from './ListContainer.jsx';
import { BrowserRouter, Switch } from 'react-router-dom';

function App() {
  return (
    <>
		<BrowserRouter>
    		<CssBaseline />
      		<Switch>
      		  <ListContainer />
	        </Switch>
      	</BrowserRouter>
    </>
  );
}



export default App;
