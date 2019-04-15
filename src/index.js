import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getSocket from './socket/Client.js';

const socket = getSocket;
let theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#9be6ff',
            main: '#64b4f6',
            dark: '#2285c3',
            contrastText: '#e0f7fa',
        },
        secondary: {
            light: '#4c8c4a',
            main: '#1b5e20',
            dark: '#003300',
            contrastText: '#c8e6c9',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

function Root() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <App getSocket={socket} />
        </MuiThemeProvider>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
