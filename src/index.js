import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HashRouter, Switch } from 'react-router-dom';
import App from './App';
import 'typeface-roboto';

function Root() {

    return (
        <>
            <CssBaseline />
            <HashRouter>
                <Switch>
                    <App />
                </Switch>
            </HashRouter>
        </>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
