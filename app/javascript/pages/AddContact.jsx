import React from 'react'
import { useState } from 'react';

import 'fontsource-roboto';

import { makeStyles } from '@material-ui/styles';

import { 
    Container, 
    Grid,
    TextField,
    Paper,
    Button
} from '@material-ui/core';

import Header from '../components/Header';

import { 
    AddCircle as AddCircleIcon,
    Clear as ClearIcon,
    Phone as PhoneIcon,
    AccountCircle as AccountCircleIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        maxWidth: 750,
        padding: 0,
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2)
    },
    input: {
        display: 'flex',
        flexGrow: 1,
        paddingRight: 0
    }
}));

export default function Index(props) {
    const classes = useStyles();
    const createNew = props.id == null;
    
    return (
        <Container className={classes.container}>
            <Paper variant='elevation' className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header
                            title={createNew ? 'New contact' : 'Edit contact'}
                            subtitle=''
                        />
                    </Grid>
                    <Grid item xs={12} container spacing={1} alignItems='center'>
                        <Grid item>
                            <AccountCircleIcon />
                        </Grid>
                        <Grid item className={classes.input}>
                            <TextField
                                fullWidth
                                color='secondary'
                                variant='filled'
                                label='Contact name'
                                type='text'
                            />
                        </Grid> 
                    </Grid>
                    <Grid item xs={12} container spacing={1} alignItems='center'>
                        <Grid item>
                            <PhoneIcon />
                        </Grid>
                        <Grid item className={classes.input}>
                            <TextField
                                fullWidth
                                color='secondary'
                                variant='filled'
                                label='Phone number'
                                type='text'
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justify='space-between'>
                        <Button
                            variant='contained'
                            color='secondary'
                            startIcon={<AddCircleIcon/>}
                        >
                            {createNew ? "Create new contact" : "Save changes"}
                        </Button>
                        <Button
                            variant='outlined'
                            startIcon={<ClearIcon/>}
                            onClick={props.routes.home}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
