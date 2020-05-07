import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import { SEAT_SIZE } from "./util/const";
import Draggable from "react-draggable";
import Typography from "@material-ui/core/Typography";

const SeatItem = ({ data }) => {
    console.log(data);
    const classes = useStyles();
    return (
        <Draggable position={{ x: 0, y: 0 }}>
            <div className={classes.itemRoot} style={{ height: SEAT_SIZE, width: SEAT_SIZE * data.seats.length }}>
                {data.seats.map(seat => (
                    <div className={classes.root}>
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