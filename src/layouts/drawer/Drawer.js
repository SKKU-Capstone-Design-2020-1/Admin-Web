import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core/styles/";
import Divider from "@material-ui/core/Divider";
import MDrawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Grey from "@material-ui/core/colors/grey";
import { DRAWER_WIDTH } from "../../libs/const";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const Drawer = ({ mobileOpen, handleDrawerToggle }) => {
    const classes = useStyles();

    const drawer = (
        <div className={classes.drawerContents}>
            <div className={classes.toolbar} >
                <FormControl className={classes.formControl}>
                    <InputLabel>Store</InputLabel>
                    <Select
                        input={<BootstrapInput />}
                    >
                        <MenuItem>asd</MenuItem>
                        <MenuItem>asd</MenuItem>
                        <MenuItem>asd</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <List className={classes.list}>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem className={classes.listItem} button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon style={{ color: 'white' }} /> : <MailIcon style={{ color: 'white' }} />}</ListItemIcon>
                        <ListItemText style={{ fontSize: '0.9rem' }} primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider className={classes.divider} variant="middle" />
            <List className={classes.list}>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem className={classes.listItem} button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon style={{ color: 'white' }} /> : <MailIcon style={{ color: 'white' }} />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

    return (
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
                <MDrawer
                    variant="temporary"
                    anchor={'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </MDrawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <MDrawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </MDrawer>
            </Hidden>
        </nav>
    )
}

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    drawerContents: {
        backgroundColor: '#1B2430',
        height: '100%',
    },
    list: {
        color: Grey['300'],
    },
    listItem: {
        "&:hover": {
            backgroundColor: '#2f3e52'
        }
    },
    divider: {
        backgroundColor: Grey['300'],
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    formControl: {
        minWidth: 120,
        margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        color: 'white',
        width: `calc(100% - ${theme.spacing(4)}px)`
    }
}));
export default Drawer;