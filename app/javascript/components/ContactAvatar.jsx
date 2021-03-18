import React from 'react'

import 'fontsource-roboto';

import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    circle: {
        width: theme.typography.fontSize * 2.5,
        height: theme.typography.fontSize * 2.5,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 0,

        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        borderRadius: '100%'
    }
}));

export default function ContactList(props) {
    const classes = useStyles();
    
    return (
        <div className={classes.circle}>
            <Typography variant="h6">
                { props.name[0].toUpperCase() }
            </Typography>
        </div>
    );
}
