import React from 'react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { 
    Container, 
    Grid,
    Paper,
    Button
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    {id: 1, name: "Contact #1", phone: "(11) 11111-1111"},
    {id: 2, name: "Contact #2", phone: "(22) 22222-2222"},
    {id: 3, name: "Contact #3", phone: "(33) 33333-3333"},
];

export default function Home(props) {
    const classes = useStyles();

    const [contacts, setContacts] = useState(mock);
    
    return (
        <Container className={classes.container}>
            <Paper variant='elevation' className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header
                            title="Contacts on Rails"
                            subtitle="Powered by React"
                        >
                            <div>
                                <Button 
                                    variant='contained' 
                                    color='secondary' 
                                    startIcon={<AddCircleIcon/>}
                                    onClick={props.routes.addContact}
                                >
                                    Add new contact
                                </Button>
                            </div>
                        </Header>
                    </Grid>
                    <Grid item xs={12}>
                        <ContactList
                            contacts={contacts}
                            clickHandler={props.routes.editContact}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
