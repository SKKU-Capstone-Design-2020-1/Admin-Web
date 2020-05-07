import React, { useState, useEffect } from 'react'
import useStyles from "@material-ui/core/styles/makeStyles";
import { MAP_BUILDER_HEIGHT } from "./util/const";
import Grey from "@material-ui/core/colors/grey";
import Seat from "./SeatItem";
import ButtonBase from '@material-ui/core/ButtonBase';
import { SEAT_SIZE } from "./util/const";
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
                <Seat />
            ))}

        </div>
    )
}

const makeStyles = useStyles(theme => ({
    root: {
        backgroundColor: Grey['300']
    }
}))
export default MapDisplay;