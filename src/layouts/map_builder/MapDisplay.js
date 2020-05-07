import React, { useState, useEffect } from 'react'
import useStyles from "@material-ui/core/styles/makeStyles";
import { MAP_BUILDER_HEIGHT } from "./util/const";
import Draggable from "react-draggable";

const MapDisplay = ({ data, seatGroups }) => {
    const classes = makeStyles();
    const [size, setSize] = useState({
        height: 0,
        width: 0,
        margin: 'auto',
    })
    useEffect(() => {
        const { height, width } = data;

        let margin = MAP_BUILDER_HEIGHT < height ? "0px" : `${(MAP_BUILDER_HEIGHT - height) / 2}px`;
        margin = margin + " auto";
        setSize({
            height, width, margin
        });

    }, [data.height, data.width])

 
    const handleDrag = (e, ui) => {
        console.log(e, ui);
    }

    console.log(seatGroups);
    return (
        <div className={classes.root}
            style={{ ...size }}>

            {seatGroups && seatGroups.map((group, idx) => (
                <Draggable onDrag={handleDrag} key={idx}>
                    <div style={{ height: 50, width: 50, border: '1px solid black', backgroundColor: 'white' }}>
                        asd
                    </div>
                </Draggable>
            ))}




        </div>
    )
}

const makeStyles = useStyles(theme => ({
    root: {
        backgroundColor: 'grey'
    }
}))
export default MapDisplay;