import React from 'react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'axios';

import { 
    Container, 
    Grid,
    Paper,
    Button,
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ContactList from '../components/ContactList';
import Spinner from '../components/Spinner';

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        maxWidth: '100rem',
        height: '100vh',
        maxHeight: '50rem',
        padding: 0,
    },
    paper: {
        height: '100%',
        padding: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column'
    },
    childContainer: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
        flexShrink: 1,
        overflow: 'hidden'
    },
    contactList: {
        display: 'flex',
        maxHeight: '100%',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        flexGrow: 1,
        flexShrink: 1,
        overflowY: 'scroll',
        overflowX: 'hidden',
        borderBottom: 'solid 1px rgba(0,0,0,0.5)'
    },
    addNew: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '12rem',
        flexGrow: 0
    }
}));

export default function Home(props) {
    const classes = useStyles();

    const [searchQuery, setSearchQuery] = useState('');
    let contacts = props.contacts;

    if (!contacts) {
        props.updateList();
    } else if (searchQuery) {
        console.log(searchQuery, props.contacts);
        contacts = props.contacts.filter(contact => {
            return contact && 
                (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery))
        });
    }

    function search(ev) {
        setSearchQuery(ev.target.value);
    }

    return (
        <Container className={classes.container}>
            <Paper variant='elevation' className={classes.paper}>
                <Navbar 
                    methods={{
                        search: search
                    }}
                />
                {/* <Header
                    title="Contacts on Rails"
                    subtitle="Powered by React"
                >
                    <div>
                        <Button 
                            variant='contained' 
                            color='secondary' 
                            startIcon={<AddCircleIcon/>}
                            onClick={props.methods.addContact}
                        >
                            Add new contact
                        </Button>
                    </div>
                </Header> */}
                <div className={classes.childContainer}>
                    { 
                        contacts ? (
                            contacts.length > 0 ?
                                <div className={classes.contactList}>
                                    <ContactList
                                        contacts={contacts}
                                        clickHandler={props.methods.editContact}
                                    /> 
                                </div> 
                            : null
                        ) : <Spinner />
                    }
                    {
                        contacts ? (
                            <div className={classes.addNew}>
                                <Button 
                                    variant='contained' 
                                    color='primary'
                                    startIcon={<AddCircleIcon/>}
                                    onClick={props.methods.addContact}
                                >
                                    Add new contact
                                </Button>
                            </div>
                        ) : null
                    }
                </div>
            </Paper>
        </Container>
    );
}
