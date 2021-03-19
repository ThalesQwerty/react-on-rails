import React from "react";
import { fade, makeStyles } from '@material-ui/styles';

import {
    Typography,
    AppBar,
    Toolbar,
    Tooltip,
    IconButton,
    InputBase,
} from "@material-ui/core";

import {
    Contacts as ContactsIcon,
    GitHub as GitHubIcon,
    Search as SearchIcon
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
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
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
                    <Tooltip title="View source on GitHub" placement="top">
                        <IconButton onClick={() => window.open("https://github.com/ThalesQwerty/react-on-rails")}>
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={props.methods.search}
                        />
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}