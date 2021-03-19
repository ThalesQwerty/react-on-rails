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
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

import Header from '../components/Header';
import Spinner from '../components/Spinner';

import NumberFormat from 'react-number-format';

import { 
    AddCircle as AddCircleIcon,
    Clear as ClearIcon,
    Phone as PhoneIcon,
    AccountCircle as AccountCircleIcon,
    Delete as DeleteIcon,
    Mail as MailIcon,
    Subject as SubjectIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
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
        paddingRight: 0,
        marginBottom: theme.spacing(1)
    }
}));

let info = null;

export default function AddContact(props) {
    const classes = useStyles();

    const createNew = props.contact == null;
    const contact = props.contact || {
        name: '', 
        phone: '',
        email: '',
        observations: ''
    };

    if (info == null && props.open) {
        info = contact;
    }

    console.log("INFO", info);
    console.log("CONTACT", contact);

    const [focus, setFocus] = useState(0);

    function apiUpdate() {
        axios.post('/api/contacts/' + (createNew ? '' : contact.id), info).then((resp) => {
            props.setSnack({
                message: resp.data.message,
                severity: resp.data.success ? 'success' : 'error'
            });

            if (resp.data.success) {
                info = null;
                props.methods.save();
            }
        }).catch((error) => {
            console.log(error);
            props.setSnack({
                message: 'An unknown error has occurred',
                severity: 'error'
            });
        })
    }

    function apiDelete() {
        if (!createNew && window.confirm("Are you sure you want to delete this contact? This action is irreversible.")) {
            axios.delete('/api/contacts/' + contact.id).then((resp) => {
                props.setSnack({
                    message: resp.data.message,
                    severity: resp.data.success ? 'success' : 'error'
                });
                
                if (resp.data.success) {
                    info = null;
                    props.methods.save();
                }
            });
        }
    }

    console.log(props.id);

    function close() {
        info = null;
        props.methods.cancel();
    }
    
    return (
        <Dialog 
            open={props.open} 
            onClose={close}
            aria-labelledby="form-dialog-title" 
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle id="form-dialog-title">
                {createNew ? 'New contact' : 'Edit contact'}
            </DialogTitle>
            <DialogContent>
                {  
                    contact || createNew ? 
                    <div>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item>
                                <AccountCircleIcon color={focus == 1 ? 'secondary' : undefined} />
                            </Grid>
                            <Grid item className={classes.input}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    label='Contact name'
                                    defaultValue={contact.name}
                                    type='text'
                                    onFocus={(ev => {
                                        setFocus(1);
                                    })}
                                    onBlur={(ev) => {
                                        setFocus(0);
                                        info.name = ev.target.value;
                                    }}
                                />
                            </Grid> 
                        </Grid>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item>
                                <PhoneIcon color={focus == 2 ? 'secondary' : undefined} />
                            </Grid>
                            <Grid item className={classes.input}>
                                <NumberFormat 
                                    defaultValue={contact.phone.replace(/\D/gm, '')} 
                                    mask={"_"}
                                    customInput={(info) => (
                                        <TextField
                                            fullWidth
                                            color='secondary'
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
                                    onFocus={(ev => {
                                        setFocus(2);
                                    })}
                                    onBlur={(ev) => {
                                        setFocus(0);
                                        info.phone = ev.target.value;
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item>
                                <MailIcon color={focus == 3 ? 'secondary' : undefined} />
                            </Grid>
                            <Grid item className={classes.input}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    label='Email address'
                                    defaultValue={contact.email}
                                    type='text'
                                    onFocus={(ev => {
                                        setFocus(3);
                                    })}
                                    onBlur={(ev) => {
                                        setFocus(0);
                                        info.email = ev.target.value;
                                    }}
                                />
                            </Grid> 
                        </Grid>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item>
                                <SubjectIcon color={focus == 4 ? 'secondary' : undefined} />
                            </Grid>
                            <Grid item className={classes.input}>
                                <TextField
                                    fullWidth
                                    color='secondary'
                                    label='Additional details'
                                    defaultValue={contact.observations}
                                    type='text'
                                    multiline
                                    rowsMax={4}
                                    onFocus={(ev => {
                                        setFocus(4);
                                    })}
                                    onBlur={(ev) => {
                                        setFocus(0);
                                        info.observations = ev.target.value;
                                    }}
                                />
                            </Grid> 
                        </Grid>
                    </div>
                    :   <Spinner />
                }
            </DialogContent>
            <DialogActions className={classes.buttons}>                    
                {
                    createNew ? 
                        <Button
                            startIcon={<ClearIcon/>}
                            variant='outlined'
                            onClick={close}
                        >
                            Cancel
                        </Button>
                    :   <Button
                            color='secondary'
                            variant='outlined'
                            startIcon={<DeleteIcon/>}
                            onClick={apiDelete}
                        >
                            Delete
                        </Button>
                }
                <Button
                    color='primary'
                    variant='contained'
                    startIcon={<AddCircleIcon/>}
                    onClick={apiUpdate}
                >
                    {createNew ? "Create" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
