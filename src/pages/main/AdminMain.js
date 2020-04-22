import React, { useState } from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles/";
import Grey from "@material-ui/core/colors/grey";
import Toolbar from "../../layouts/toolbar/Toolbar";
import Drawer from "../../layouts/drawer/Drawer";
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';


const AdminMain = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Toolbar handleDrawerToggle={handleDrawerToggle} title={"Admin Page"} />
            <Drawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

}))
export default AdminMain