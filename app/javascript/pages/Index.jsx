import React from 'react'
import { useState } from 'react';

import 'fontsource-roboto';

import { makeStyles } from '@material-ui/styles';

import { 
    Container, 
    Grid,
    TextField,
    Paper
} from '@material-ui/core';

import Header from '../components/Header';
import ContactList from '../components/ContactList';

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        maxWidth: 1000,
        padding: 0,
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2)
    }
}));

const mock = [
    {name: "Contact #1", phone: "(11) 11111-1111"},
    {name: "Contact #2", phone: "(22) 22222-2222"},
    {name: "Contact #3", phone: "(33) 33333-3333"},
];

export default function Index() {
    const classes = useStyles();

    const [contacts, setContacts] = useState(mock);

    console.log(contacts);
    
    return (
        <Container className={classes.container}>
            <Paper variant='elevation' className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={12}>
                        <ContactList
                            contacts={contacts}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
