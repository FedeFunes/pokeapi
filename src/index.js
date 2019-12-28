import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from './App';

function Root() {

    return (
        <>
            <BrowserRouter>
                <CssBaseline />
                <Switch>
                    <App />
                </Switch>
            </BrowserRouter>
        </>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
