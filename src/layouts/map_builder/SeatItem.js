import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import { SEAT_SIZE, MAP_CLICK } from "./util/const";
import Typography from "@material-ui/core/Typography";
import { useDrag } from "react-dnd";
import classNames from "classnames";

const SeatItem = ({ data, handleClick, disableDrag }) => {
    const classes = useStyles();
    const [, drag] = useDrag({
        item: { id: data.seat_id, x: data.x, y: data.y, type: 'seat' },
        canDrag: !disableDrag, 
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    // hide seat
    // if (isDragging) {
    //     return <div ref={drag} />
    // }

    return (
        <div
            ref={drag}
            onClick={() => handleClick({ type: MAP_CLICK.CLICK_SEAT, data })}
            className={classNames(classes.itemRoot, disableDrag ? classes.draggable : classes.notDraggable)}
            style={{ left: data.x, top: data.y, height: SEAT_SIZE, transform: `rotate(${data.deg}deg)`, width: SEAT_SIZE * data.seats.length }}>
            {data.seats.map((seat, idx) => (
                <div className={classNames(classes.root, data.clicked && classes.clicked)} key={idx}>
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
        border: `.75px solid`,
        background: 'white',
        height: SEAT_SIZE,
        width: SEAT_SIZE,
        display: 'flex',
        flexDirection: 'column'
    },
    clicked: {
        borderColor: theme.palette.primary.dark,
        border: `1.5px solid`
    },
    itemRoot: {
        display: 'flex',
        position: 'absolute',
    },
    draggable: {
        cursor: "pointer"
    },
    notDraggable: {
        cursor: "move"
    },
    seatID: {
        fontSize: '0.9rem'
    }
}))
export default SeatItem;