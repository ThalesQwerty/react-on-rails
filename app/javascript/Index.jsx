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

export default function Index() {
    const [page, setPage] = useState('home');
    const [contactId, setContactId] = useState(null);

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
    
    function loadPage(page) {
        switch (page) {
            case 'home':
                return (
                    <Home 
                        routes={{
                            addContact: () => {
                                setPage('addContact');
                                setContactId(null);
                            },
                            editContact: (id) => {
                                setPage('addContact');
                                setContactId(id);
                            },
                        }}
                        setSnack={(info) => setSnack({open: true, message: info.message, severity: info.severity})}
                    />
                );
                break;
            case 'addContact':
                return (
                    <AddContact 
                        id={contactId}
                        routes={{
                            home: () => {
                                setPage('home');
                            }
                        }}
                        setSnack={(info) => setSnack({open: true, message: info.message, severity: info.severity})}
                    />
                );
                break;
        }
    }
    
    return (
        <div>
            { loadPage(page) }
            <Snackbar open={snack.open} autoHideDuration={6000} onClose={closeSnack}>
                <Alert elevation={6} variant="filled" onClose={closeSnack} severity={snack.severity}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
