import React from 'react'
import ReactDOM from 'react-dom'

import 'fontsource-roboto';

import { 
    MuiThemeProvider
} from '@material-ui/core';

import { theme } from '../styles/theme.js';

import Index from '../Index.jsx';

function Main() {
    return (
        <MuiThemeProvider theme={theme}>
            <Index />
        </MuiThemeProvider>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Main />,
        document.body.appendChild(document.createElement('div')),
    )
})
