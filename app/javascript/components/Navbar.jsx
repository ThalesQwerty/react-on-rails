import React from "react";
import { makeStyles } from '@material-ui/styles';

import {
    Typography,
    AppBar,
    Toolbar,
    Tooltip,
    IconButton
} from "@material-ui/core";

import {
    Contacts as ContactsIcon,
    GitHub as GitHubIcon
} from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: '0.5rem'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: 1
    }
}));

export default function Navbar(props) {
    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography className={classes.title}>
                    <ContactsIcon className={classes.icon} />
                    <h3>
                        Contacts on Rails
                    </h3>
                        
                </Typography>
                <div className={classes.buttons}>
                    <Tooltip title="See on GitHub" placement="top">
                        <IconButton onClick={() => window.open("https://github.com/ThalesQwerty")}>
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    );
}