import React from 'react'

import 'fontsource-roboto';

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        padding: 0
    }
}));

import ContactAvatar from "./ContactAvatar";

export default function ContactList(props) {
    const classes = useStyles();
    
    return (<List class={classes.root}>
        {
            props.contacts.map(contact => (
                <ListItem button>
                    <ListItemIcon>
                        <ContactAvatar name={contact.name} />
                    </ListItemIcon>
                    <ListItemText>
                        <strong>
                            {contact.name}
                        </strong><br/>
                        {contact.phone}
                    </ListItemText>
                </ListItem>
            ))
        }
    </List>);
}
