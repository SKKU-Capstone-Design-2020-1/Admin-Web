import React, { useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles/";
import Grey from "@material-ui/core/colors/grey";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Toolbar from "../../layouts/toolbar/Toolbar";
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

const DRAWER_WIDTH = 240;

const AdminMain = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div className={classes.drawerContents}>
            <div className={classes.toolbar} />
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
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon style={{ color: 'white' }} /> : <MailIcon style={{ color: 'white' }} />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Toolbar handleDrawerToggle={handleDrawerToggle} title={"Admin Page"}/>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci totam sapiente, molestias temporibus a vitae blanditiis autem, nihil reprehenderit obcaecati necessitatibus doloribus hic, rerum nesciunt ipsam praesentium earum placeat architecto!
                </Typography>
            </main>
        </div>
    )
}
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: Grey['100'],
        height: '100vh',
        width: '100wh',
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
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
    }
}))
export default AdminMain