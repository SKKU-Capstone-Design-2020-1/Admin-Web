import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles/";
import Grey from "@material-ui/core/colors/grey";
import Toolbar from "../../layouts/toolbar/Toolbar";
import Drawer from "../../layouts/drawer/Drawer";
import CssBaseline from '@material-ui/core/CssBaseline';
import NoStoreAdded from "./NoStoreAdded";
import AddStore from "../add_store/AddStore";
import URLS from "../../libs/urls";

const AdminMain = ({ location }) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const getContents = () => {
        switch (location.pathname) {
            case URLS.admin:
                return <NoStoreAdded />
            case URLS.addStore:
                return <AddStore />
            default:
                return <NoStoreAdded />
        }
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Toolbar handleDrawerToggle={handleDrawerToggle} title={"Admin Page"} />
            <Drawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {getContents()}
            </main>
        </div>
    )
}
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: Grey['100'],
        minHeight: '100vh',
        width: '100wh',
        display: 'flex'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

}))
export default AdminMain