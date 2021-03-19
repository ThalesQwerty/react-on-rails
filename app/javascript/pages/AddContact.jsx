import React from 'react'
import { useState } from 'react';

import 'fontsource-roboto';

import { makeStyles } from '@material-ui/styles';

import axios from 'axios';

import { 
    Container, 
    Grid,
    TextField,
    Paper,
    Button,
    IconButton
} from '@material-ui/core';

import Header from '../components/Header';
import Spinner from '../components/Spinner';

import NumberFormat from 'react-number-format';

import { 
    AddCircle as AddCircleIcon,
    Clear as ClearIcon,
    Phone as PhoneIcon,
    AccountCircle as AccountCircleIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

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
    const [contact, setContact] = useState(null);
    const info = contact || {id: props.id};

    if (!createNew && contact == null) {
        axios.get('/api/contacts/' + props.id).then((resp) => {
            setContact(resp.data);
        }).catch((error) => {
            props.setSnack({
                message: 'An unknown error has occurred',
                severity: 'error'
            });
        })
    }

    function apiUpdate() {
        axios.post('/api/contacts/' + (createNew ? '' : props.id), info).then((resp) => {
            props.setSnack({
                message: resp.data.message,
                severity: resp.data.success ? 'success' : 'error'
            });
            if (resp.data.success) props.routes.home();
        }).catch((error) => {
            props.setSnack({
                message: 'An unknown error has occurred',
                severity: 'error'
            });
        })
    }

    function apiDelete() {
        if (!createNew && window.confirm("Are you sure you want to delete this contact? This action is irreversible.")) {
            axios.delete('/api/contacts/' + props.id).then((resp) => {
                props.setSnack({
                    message: resp.data.message,
                    severity: resp.data.success ? 'success' : 'error'
                });
                if (resp.data.success) props.routes.home();
            });
        }
    }
    
    return (
        <Container className={classes.container}>
            <Paper variant='elevation' className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header
                            title={createNew ? 'New contact' : 'Edit contact'}
                            subtitle=''
                        >
                            {
                                createNew ? undefined : 
                                    <IconButton 
                                        color='secondary'
                                        onClick={apiDelete}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                            }
                        </Header>
                    </Grid>
                    {  
                        contact || createNew ? <Grid item xs={12} container spacing={2}>
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
                                        value={contact ? contact.name : ''}
                                        type='text'
                                        onChange={(ev) => {
                                            setContact({
                                                ...contact,
                                                name: ev.target.value
                                            });
                                        }}
                                    />
                                </Grid> 
                            </Grid>
                            <Grid item xs={12} container spacing={1} alignItems='center'>
                                <Grid item>
                                    <PhoneIcon />
                                </Grid>
                                <Grid item className={classes.input}>
                                    <NumberFormat 
                                        value={contact ? contact.phone : '55'} 
                                        mask={"_"}
                                        customInput={(info) => (
                                            <TextField
                                                fullWidth
                                                color='secondary'
                                                variant='filled'
                                                label='Phone number'
                                                value={info.value}
                                                type='text'
                                                onChange={info.onChange}
                                                onBlur={info.onBlur}
                                                onFocus={info.onFocus}
                                                onKeyDown={info.onKeyDown}
                                                onMouseUp={info.onMouseUp}
                                            />
                                        )} 
                                        fixedDecimalScale={false}
                                        decimalScale={undefined}
                                        format={'+## ## #####-####'}
                                        onBlur={(ev) => {
                                            setContact({
                                                ...contact,
                                                phone: ev.target.value
                                            });
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        :   <Spinner />
                    }
                    <Grid item container xs={12} justify='space-between'>
                        <Button
                            variant='contained'
                            color='secondary'
                            startIcon={<AddCircleIcon/>}
                            onClick={apiUpdate}
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
