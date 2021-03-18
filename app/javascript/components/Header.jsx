import React from 'react'

import 'fontsource-roboto';

import { makeStyles } from '@material-ui/styles';

import {
    Button
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    h1: {
        marginBottom: theme.spacing(0)
    },
    p: {
        marginTop: theme.spacing(0)
    }
}));

export default function Header() {
    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.root}>
                <div>
                    <h1 className={classes.h1}>
                        Contacts on Rails
                    </h1>
                    <p className={classes.p}>
                        Powered by React and Rails
                    </p>
                </div>
                <div>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        startIcon={<AddCircleIcon/>}
                    >
                        Add new contact
                    </Button>
                </div>
            </div>
            <hr/>
        </div>
    );
}
