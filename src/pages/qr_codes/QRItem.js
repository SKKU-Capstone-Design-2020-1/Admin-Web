import React, { useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import QR from "qrcode";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const QRItem = ({ seat }) => {
    const classes = useStyles();

    useEffect(() => {
        if (!seat) return;

        const canvas = document.getElementById(`qrcanvas_${seat.id}`);
        const data = `https://reserveseats.site/qr?sid=${seat.sid}&map_id=${seat.map_id}&seat_id=${seat.seat_id}&id=${seat.id}`
        QR.toCanvas(canvas, data, err => {
            if (!err) return;    
            console.log(err);
        })
    }, [seat])



    return (
        <Paper className={classes.root}>
            <Typography align="center" className={classes.typoID}>
                {`ID: ${seat.id}`}
            </Typography>
            <canvas id={`qrcanvas_${seat.id}`} />
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        padding: theme.spacing(0.5),
    },
    typoID: {
        marginTop: theme.spacing(1), 
    }
}))
export default QRItem;