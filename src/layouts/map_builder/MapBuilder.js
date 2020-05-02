import React, { useState, useLayoutEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import MapToolbar from "./MapToolbar";
import MapTabs from "./MapTabs";
import AppBar from "@material-ui/core/AppBar";
import Grey from "@material-ui/core/colors/grey";
import { DRAWER_WIDTH } from "../../libs/const";
import useTheme from "@material-ui/core/styles/useTheme";

const MapBuilder = () => {
    const classes = useStyles();
    const [mapWidth, setWidth] = useState(0);
    const theme = useTheme();
    useLayoutEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            let adjustedWidth;
            if (width > theme.breakpoints.values['sm'])
                adjustedWidth = width - DRAWER_WIDTH - theme.spacing(8) - 2;
            else //when drawer is hidden 
                adjustedWidth = width - theme.spacing(8);

            if (adjustedWidth > 480) setWidth(adjustedWidth);
            else setWidth(480)            
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" elevation={1}>
                <MapToolbar />
                <MapTabs />
            </AppBar>
            <div className={classes.main} style={{width: mapWidth}} >
                <div style={{ width: 1500, height: 1000, backgroundColor: 'black' }} />
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
        overflowX: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
    }
}))
export default MapBuilder