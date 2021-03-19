import React from 'react'
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import AddContact from './pages/AddContact';

import {
    Snackbar,
} from '@material-ui/core';

import {
    Alert
} from '@material-ui/lab';

const index = {
    home: Home,
    addContact: AddContact
};

import axios from 'axios';

const pages = {
    home: 'home',
    addContact: 'addContact'
}

let canUpdateFields = true;

export default function Index() {
    const [page, setPage] = useState(pages.home);
    const [contacts, setContacts] = useState(null);
    const [contact, setContact] = useState(null);

    const [snack, setSnack] = useState({open: false, message: '', severity: 'success'});

    useEffect(() => {
        const param = document.querySelector('meta[name="csrf-param"]').getAttribute('content');
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        axios.defaults.headers = {
            ...axios.defaults.headers,
            'x-csrf-token': token
        };
    });

    function closeSnack(event, reason) {
        if (reason !== 'clickaway') {
            setSnack({...snack, open: false});
        }
    }

    function loadContact(id) {
        if (id != null) {
            axios.get('/api/contacts/' + id).then((resp) => {
                const data = resp.data;
                const contact = {
                    ...data.contact,
                    fields: {
                        phones: data.fields.filter(field => field.contact_type == 'phone').map(field => ({id: field.id, value: field.value})),
                        emails: data.fields.filter(field => field.contact_type == 'email').map(field => ({id: field.id, value: field.value}))
                    }
                };
                console.log(contact);
                setContact(contact);
                setPage(pages.addContact);
            }).catch((error) => {
                setSnack({
                    message: 'An unknown error has occurred',
                    severity: 'error'
                });
            })
        }
    }

    function updateList() {
        canUpdateFields = false;
        axios.get('/api/contacts').then((resp) => {
            canUpdateFields = true;
            setContacts(resp.data);
            setPage(pages.home);
        }).catch((error) => {
            setSnack({
                message: 'Failed to load contacts.',
                severity: 'error'
            })
        });
    }
    
    return (
        <div>
            <Home 
                updateList={updateList}
                contacts={contacts}
                methods={{
                    addContact: () => {
                        setContact(null);
                        setPage(pages.addContact);
                    },
                    editContact: (id) => {
                        loadContact(id);
                    },
                }}
                setSnack={(info) => setSnack({open: true, message: info.message, severity: info.severity})}
            />
            <AddContact 
                canUpdateFields={canUpdateFields}
                contact={contact}
                open={page == pages.addContact}
                methods={{
                    cancel: () => {
                        setPage(pages.home);
                    },
                    save: () => {
                        updateList();
                    }
                }}
                setSnack={(info) => setSnack({open: true, message: info.message, severity: info.severity})}
            />
            <Snackbar open={snack.open} autoHideDuration={6000} onClose={closeSnack}>
                <Alert elevation={6} variant="filled" onClose={closeSnack} severity={snack.severity}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
