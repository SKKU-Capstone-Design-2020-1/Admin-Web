import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { DRAWER_WIDTH } from "../../libs/const";

const Toolbar = ({ handleDrawerToggle, title }) => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar} elevation={2}>
            <MToolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} varaint="h6" noWrap>
                    {title}
                </Typography>
            </MToolbar>
        </AppBar>
    )
}

const useStyles = makeStyles(theme => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
        },
        backgroundColor: 'white',
        color: 'black',
    },
    title: {
        fontWeight: 600,
        fontSize: '1.2rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}))
export default Toolbar;