import React from 'react'

import 'fontsource-roboto';

import { makeStyles } from '@material-ui/styles';

import {
    Button
} from '@material-ui/core';

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

export default function Header(props) {
    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.root}>
                <div>
                    <h1 className={classes.h1}>
                        { props.title }
                    </h1>
                    <p className={classes.p}>
                        { props.subtitle }
                    </p>
                </div>
                { props.children }
            </div>
            <hr/>
        </div>
    );
}
