import React, { useEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector } from "react-redux";
import QRItem from "./QRItem";

const QRCodes = () => {
    const classes = useStyles();
    const [seats, setSeats] = useState([]);
    const { seatGroups, sid } = useSelector(state => state.store);

    useEffect(() => {
        if (!seatGroups || seatGroups.length === 0) return;

        let allSeats = [];
        for (let seatGroup of seatGroups) {
            for (let seat of seatGroup.seats) {
                const { seats, id, ...other } = seatGroup;
                allSeats.push({
                    ...seat,
                    ...other,
                    sid, 
                });
            }
        }

        setSeats(allSeats);
    }, [seatGroups])


    return (
        <div className={classes.root}>
            {seats && seats.map(seat => (
                <QRItem seat={seat} key={seat.id} />
            ))}
        </div>
    )
}
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
}))
export default QRCodes;