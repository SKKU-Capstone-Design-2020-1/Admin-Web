import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles/";
import Grey from "@material-ui/core/colors/grey";
import Toolbar from "../../layouts/toolbar/Toolbar";
import Drawer from "../../layouts/drawer/Drawer";
import CssBaseline from '@material-ui/core/CssBaseline';
import NoStoreAdded from "./NoStoreAdded";
import AddStore from "../add_store/AddStore";
import URLS from "../../libs/urls";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Store from "../store/Store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditStore from "../edit_store/EditStore";
import EditMap from "../edit_map/EditMap";
import { unsubscribeAll } from "../store/storeActions";
import QRCodes from "../qr_codes/QRCodes";

const AdminMain = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);
    const auth = useSelector(state => state.auth.owner);

    useEffect(() => {
        return () => dispatch(unsubscribeAll());
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const initPage = () => {
        if (auth.store_ids.length === 0) return <NoStoreAdded />
        else return <Redirect to={`/admin/${auth.store_ids[0].id}`} />
    }

    const getContents = () => {
        return (
            <Switch>
                <Route path={URLS.addStore} component={AddStore} />
                <Route exact path={URLS.admin} component={initPage} />
                <Route path={URLS.editStore} component={EditStore} />
                <Route path={URLS.editMap} component={EditMap} />
                <Route path={URLS.qr} component={QRCodes}/>
                <Route path={URLS.store} component={Store} />
            </Switch>
        );

    }

    if (!auth.uid) return <Redirect to="/" />
    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <Toolbar handleDrawerToggle={handleDrawerToggle} title={"Admin Page"} />
                <Drawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {getContents()}
                </main>
            </div>

        </Router>

    )
}
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: Grey['100'],
        minHeight: '100vh',
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