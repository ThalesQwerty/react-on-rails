import React from 'react'
import { useState } from 'react';

import Home from "./pages/Home";
import AddContact from "./pages/AddContact";

const index = {
    home: Home,
    addContact: AddContact
};



export default function Index() {
    const [page, setPage] = useState('home');
    const [contactId, setContactId] = useState(null);

    function loadPage(page) {
        switch (page) {
            case 'home':
                return (
                    <Home routes={{
                        addContact: () => {
                            setPage('addContact');
                            setContactId(null);
                        },
                        editContact: (id) => {
                            setPage('addContact');
                            setContactId(id);
                        },
                    }}/>
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
                    }}/>
                );
                break;
        }
    }
    
    return loadPage(page);
}
