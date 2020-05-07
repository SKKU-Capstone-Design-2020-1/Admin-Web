import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import ButtonBase from '@material-ui/core/ButtonBase';
import { SEAT_SIZE } from "./util/const";
import Draggable from "react-draggable";
const SeatItem = ({ data }) => {
    console.log(data);
    const classes = useStyles();
    return (
        <Draggable position={{ x: 0, y: 0 }}>
            <div className={classes.itemRoot} style={{ height: SEAT_SIZE, width: SEAT_SIZE * data.seats.length }}>
                {data.seats.map(seat => (
                    <div className={classes.root}>
                        TEST
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
    }
}))
export default SeatItem;