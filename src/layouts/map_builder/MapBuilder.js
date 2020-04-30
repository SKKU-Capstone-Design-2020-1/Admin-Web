import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import MapToolbar from "./MapToolbar";

const MapBuilder = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MapToolbar />

        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 500,
    }
}))
export default MapBuilder