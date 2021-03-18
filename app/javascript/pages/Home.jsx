import React from 'react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'axios';

import { 
    Container, 
    Grid,
    Paper,
    Button
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import Header from '../components/Header';
import ContactList from '../components/ContactList';
import Spinner from '../components/Spinner';

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

export default function Home(props) {
    const classes = useStyles();

    const [contacts, setContacts] = useState(null);

    if (!contacts) {
        axios.get("/api/contacts").then((resp) => {
            setContacts(resp.data);
        });
    }
    
    
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
                        { 
                            contacts ? 
                                <ContactList
                                    contacts={contacts}
                                    clickHandler={props.routes.editContact}
                                /> 
                            :   <Spinner />
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
