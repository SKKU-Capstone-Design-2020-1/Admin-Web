import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import ButtonBase from '@material-ui/core/ButtonBase';
import { SEAT_SIZE } from "./util/const";
import Draggable from "react-draggable";
const SeatItem = () => {
    const classes = useStyles();
    return (
        <Draggable position={{ x: 0, y: 0 }}>
            <div className={classes.root}>
                <ButtonBase>
                    {"test"}
                </ButtonBase>
            </div>
        </Draggable>

    )
}

const useStyles = makeStyles(theme => ({
    root: {
        height: SEAT_SIZE,
        width: SEAT_SIZE,
        border: `1px solid black`,
        background: 'white'
    }
}))
export default SeatItem;