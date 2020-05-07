import React, { useState, useEffect } from 'react'
import useStyles from "@material-ui/core/styles/makeStyles";
import { MAP_BUILDER_HEIGHT } from "./util/const";
import Grey from "@material-ui/core/colors/grey";
import Seat from "./SeatItem";
import ButtonBase from '@material-ui/core/ButtonBase';
import { SEAT_SIZE, MAP_EVENTS } from "./util/const";
import Draggable from "react-draggable";

const MapDisplay = ({ data, seatGroups, handleEvents }) => {
    const classes = makeStyles();
    const [size, setSize] = useState({
        height: 0,
        width: 0,
        margin: 'auto',
    })
    const [cachePos, setCachePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const { height, width } = data;

        let margin = MAP_BUILDER_HEIGHT < height ? "0px" : `${(MAP_BUILDER_HEIGHT - height) / 2}px`;
        margin = margin + " auto";
        setSize({
            height, width, margin
        });

    }, [data.height, data.width])

    const handleDrag = (type, data, idx) => {
        switch (type) {
            case "ON_DRAG":
                const { x, y } = data;
                setCachePos({ x, y });
                break;

            case "ON_STOP":
                let updated_x = cachePos.x;
                let updated_y = cachePos.y;


                if (updated_x + (SEAT_SIZE * seatGroups[idx].seats.length) > size.width)
                    updated_x = size.width - (SEAT_SIZE * seatGroups[idx].seats.length);
                else if (updated_x < 0) updated_x = 0;

                if (updated_y + SEAT_SIZE > size.height) updated_y = size.height - SEAT_SIZE;
                else if (updated_y < 0) updated_y = 0;

                handleEvents({ type: MAP_EVENTS.UPDATE_SEAT_GROUP, data: { x: updated_x, y: updated_y, seat_id: seatGroups[idx].seat_id } });
                setCachePos({
                    x: 0, y: 0
                });
                break;
        }
    }

    return (
        <div className={classes.root}
            style={{ ...size }}>

            {seatGroups && seatGroups.map((group, idx) => (
                <Seat idx={idx} handleDrag={handleDrag} key={idx} data={group} />
            ))}

        </div>
    )
}

const makeStyles = useStyles(theme => ({
    root: {
        backgroundColor: Grey['300'],
        overflow: 'auto'
    }
}))
export default MapDisplay;