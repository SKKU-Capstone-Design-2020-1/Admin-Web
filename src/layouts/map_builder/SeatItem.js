import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import { SEAT_SIZE } from "./util/const";
import Typography from "@material-ui/core/Typography";
import { useDrag } from "react-dnd";

const SeatItem = ({ data }) => {
    const classes = useStyles();
    const [, drag] = useDrag({
        item: { id: data.seat_id, x: data.x, y: data.y, type: 'seat' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    // hide seat
    // if (isDragging) {
    //     return <div ref={drag} />
    // }

    return (
        <div ref={drag} className={classes.itemRoot} style={{ left: data.x, top: data.y, height: SEAT_SIZE, width: SEAT_SIZE * data.seats.length }}>
            {data.seats.map((seat, idx) => (
                <div className={classes.root} key={idx}>
                    <Typography variant="body1" className={classes.seatID}>
                        {seat.id}
                    </Typography>
                </div>
            ))}
        </div>
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
        position: 'absolute',
        cursor: 'move'
    },
    seatID: {
        fontSize: '0.9rem'
    }
}))
export default SeatItem;