import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import { SEAT_SIZE } from "./util/const";
import Draggable from "react-draggable";
import Typography from "@material-ui/core/Typography";

const SeatItem = ({ data, handleDrag, idx }) => {
    const classes = useStyles();
    return (
        <Draggable
            style={{ position: 'absolute' }}
            onStop={(e, drag) => handleDrag("ON_STOP", drag, idx)}
            onDrag={(e, drag) => handleDrag("ON_DRAG", drag)}
            >
            <div className={classes.itemRoot} style={{ height: SEAT_SIZE, width: SEAT_SIZE * data.seats.length }}>
                {data.seats.map((seat, idx) => (
                    <div className={classes.root} key={idx}>
                        <Typography variant="body1" className={classes.seatID}>
                            {seat.id}
                        </Typography>
                    </div>
                ))}
            </div>
        </Draggable>

    )
}

const useStyles = makeStyles(theme => ({
    root: {
        border: `.75px solid black`,
        background: 'white',
        height: SEAT_SIZE,
        width: SEAT_SIZE,
        display: 'flex',
        flexDirection: 'column'
    },
    itemRoot: {
        display: 'flex',
    },
    seatID: {
        fontSize: '0.9rem'
    }
}))
export default SeatItem;