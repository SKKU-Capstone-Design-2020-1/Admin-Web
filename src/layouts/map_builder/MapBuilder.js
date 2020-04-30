import React, { useState, useEffect, useRef } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import MapToolbar from "./MapToolbar";
import MapTabs from "./MapTabs";
import AppBar from "@material-ui/core/AppBar";
import Grey from "@material-ui/core/colors/grey";

const MapBuilder = () => {
    const classes = useStyles();
    const mainRef = useRef(null);

    useEffect(() => {
        console.log(mainRef.current.width);
        console.log(mainRef.current.offsetWidth)
    }, [mainRef.current])
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" elevation="1">
                <MapToolbar />
                <MapTabs />
            </AppBar>
            <div ref={mainRef} className={classes.main}>

            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 500,
        margin: theme.spacing(1),
        border: `.5px solid ${Grey['400']}`,
        backgroundColor: 'white',
        paddingBottom: 1,
    },
    main: {
        overflow: 'auto',
        maxHeight: '500px',
        maxWidth: '100vw',
        overflowX: 'auto'
    }
}))
export default MapBuilder