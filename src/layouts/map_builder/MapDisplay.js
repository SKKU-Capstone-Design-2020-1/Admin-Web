import React, { useState, useEffect } from 'react'
import useStyles from "@material-ui/core/styles/makeStyles";
import { MAP_BUILDER_HEIGHT } from "./util/const";

const MapDisplay = ({ data }) => {
    const classes = makeStyles();
    const [size, setSize] = useState({
        height: 0,
        width: 0,
    })
    useEffect(() => {
        const { height, width } = data;
        setSize({
            height, width
        })
    }, [data])

    return (
        <div className={classes.root}
            style={{
                margin: `${(MAP_BUILDER_HEIGHT - size.height) / 2}px auto`,
                height: size.height,
                width: size.width
            }}>

        </div>
    )
}

const makeStyles = useStyles(theme => ({
    root: {
        backgroundColor: 'grey'
    }
}))
export default MapDisplay;