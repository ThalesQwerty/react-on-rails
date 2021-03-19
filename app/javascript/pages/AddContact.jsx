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
    Subject as SubjectIcon,
    Add as AddIcon,
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
    },
    removeInputButton: {
        padding: 0
    }
}));

let info = null;

const emptyFields = {
    phones: [
        {id: null, value: ''}
    ],
    emails: [
        {id: null, value: ''}
    ],
}

const defaultContact = {
    name: '', 
    observations: '',
    fields: emptyFields
};

const fieldType = {
    phone: 'phone',
    email: 'email'
};

export default function AddContact(props) {
    const classes = useStyles();

    const [fields, setFields] = useState(emptyFields);
    const createNew = props.contact == null;
    const contact = props.contact || defaultContact;

    if (info == null && props.open && props.canUpdateFields) {
        info = contact;
        setFields(contact.fields);
    }

    const [focus, setFocus] = useState(0);

    console.log(fields);

    function apiPostFields(fields) {
        return [
            ...fields.phones.map(field => ({id: field.id, value: field.value, contact_type: 'phone'})),
            ...fields.emails.map(field => ({id: field.id, value: field.value, contact_type: 'email'})),
        ]
    }

    function apiUpdate() {
        const payload = {
            ...info,
            fields: undefined,
            addFields: apiPostFields(fields),
            deleteFields: emptyFields
        };
        
        for (const type in payload.deleteFields) {
            payload.deleteFields[type] = contact.fields[type].filter(oldField => {
                return fields[type].filter(field => field.id == oldField.id).length == 0;
            });
        }

        payload.deleteFields = apiPostFields(payload.deleteFields);

        console.log("Update", payload);

        axios.post('/api/contacts/' + (createNew ? '' : contact.id), payload).then((resp) => {
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

    function close() {
        info = null;
        // setFields(emptyFields);
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
                                    onChange={(ev) => {
                                        info.name = ev.target.value;
                                    }}
                                    onBlur={(ev) => {
                                        setFocus(0);
                                    }}
                                />
                            </Grid> 
                        </Grid>
                        {
                            fields.phones.map((field, i) => (
                                <Grid container spacing={1} alignItems='center' key={i}>
                                    <Grid item>
                                        {
                                            i == 0 ? 
                                                <PhoneIcon 
                                                    color={focus == fieldType.phone + i ? 'secondary' : undefined} 
                                                />
                                            :   <IconButton 
                                                    color='primary' 
                                                    className={classes.removeInputButton}
                                                    onClick={(ev) => {
                                                        let newFields = {...fields};
                                                        newFields.phones.splice(i, 1);

                                                        setFields(newFields);
                                                    }}
                                                >
                                                    <ClearIcon />
                                                </IconButton>
                                        }
                                    </Grid>
                                    <Grid item className={classes.input}>
                                        <NumberFormat 
                                            defaultValue={field.value ? field.value.replace(/\D/gm, '') : ''} 
                                            mask={"_"}
                                            customInput={(info) => (
                                                <TextField
                                                    fullWidth
                                                    color='secondary'
                                                    label={i > 0 ? 'Phone number #' + (i + 1) : 'Phone number'}
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
                                            onFocus={(ev) => {
                                                setFocus(fieldType.phone + i);
                                            }}
                                            onChange={(ev) => {
                                                const newFields = fields;
                                                newFields.phones[i].value = ev.target.value;

                                                setFields(newFields);
                                            }}
                                            onBlur={(ev) => {
                                                setFocus(0);
                                            }}
                                        />
                                    </Grid>
                                    {
                                        i == fields.phones.length - 1 ? 
                                            <Grid item>
                                                <IconButton 
                                                    color='secondary'
                                                    onClick={() => {
                                                        setFields({
                                                            ...fields,
                                                            phones: [
                                                                ...fields.phones,
                                                                {id: null, value: defaultContact.phone}
                                                            ]
                                                        });
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Grid>
                                        : null
                                    }
                                </Grid>
                            ))
                        }
                        {
                            fields.emails.map((field, i) => (
                                <Grid container spacing={1} alignItems='center' key={i}>
                                    <Grid item>
                                        {
                                            i == 0 ? 
                                                <MailIcon color={focus == 3 ? 'secondary' : undefined} />
                                            :   <IconButton 
                                                    color='primary' 
                                                    className={classes.removeInputButton}
                                                    onClick={(ev) => {
                                                        let newFields = {...fields};
                                                        newFields.emails.splice(i, 1);

                                                        setFields(newFields);
                                                    }}
                                                >
                                                    <ClearIcon />
                                                </IconButton>
                                        }
                                    </Grid>
                                    <Grid item className={classes.input}>
                                        <TextField
                                            fullWidth
                                            color='secondary'
                                            label={i > 0 ? 'Email address #' + (i + 1) : 'Email address'}
                                            defaultValue={field.value}
                                            type='text'
                                            onFocus={(ev => {
                                                setFocus(3);
                                            })}
                                            onChange={(ev) => {
                                                const newFields = fields;
                                                newFields.emails[i].value = ev.target.value;

                                                setFields(newFields);
                                            }}
                                            onBlur={(ev) => {
                                                setFocus(0);
                                            }}
                                        />
                                    </Grid> 
                                    {
                                        i == fields.emails.length - 1? 
                                            <Grid item>
                                                <IconButton 
                                                    color='secondary'
                                                    onClick={() => {
                                                        setFields({
                                                            ...fields,
                                                            emails: [
                                                                ...fields.emails,
                                                                {id: null, value: defaultContact.email}
                                                            ]
                                                        });
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Grid>
                                        : null
                                    }
                                </Grid>
                            ))
                        }
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
                                    onChange={(ev) => {
                                        info.observations = ev.target.value;
                                    }}
                                    onBlur={(ev) => {
                                        setFocus(0);
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
