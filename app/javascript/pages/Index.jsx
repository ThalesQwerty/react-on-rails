import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import 'fontsource-roboto';

import { makeStyles } from '@material-ui/styles';

import { 
    Container, 
    Grid,
    TextField,
    Paper
} from '@material-ui/core';

import theme from '../styles/theme';

const useStyles = makeStyles((theme) => ({
    paper: {
        textAlign: 'center',
        padding: theme.spacing(2)
    }
}));

export default function Index() {
    const classes = useStyles();
    
    return (
        <Container>
            <Paper variant='elevation' className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>
                            Contact List
                        </h1>
                        <p>
                            Powered by "React on Rails"
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
