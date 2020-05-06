import React, { useEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MAP_DIALOGS } from "../util/const";

const defaultValue = {
    num: '',
    seat_ids: '',
}
const SeatDialog = ({ open, handleDialog, seatSize }) => {
    const classes = useStyles();
    const [values, setValues] = useState(defaultValue);
    const [idsDisabled, setIdsDisabled] = useState(true);
    
    useEffect(() => {
        if (values.num === '') {
            setIdsDisabled(true);
            setValues({
                ...values,
                seat_ids: '', 
            });
        }
        else {
            let seat_ids = '';
            let num = Number(values.num);
            for (let i = seatSize.length + 1; i <= num; i++){
                seat_ids = seat_ids + i;
                if (i !== num) seat_ids = seat_ids + ","; 
            }
            setIdsDisabled(false);
            setValues({
                ...values,
                seat_ids
            });
        }
    }, [values.num])

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.id]: e.target.value, 
        })
    }


    return (
        <Dialog
            maxWidth={"xs"}
            fullWidth
            open={open}
            onClose={() => handleDialog({ type: MAP_DIALOGS.CLOSE_SEAT })}
        >
            <DialogTitle>Create a seat</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out information on new seats
                </DialogContentText>
                <div className={classes.textRoot}>
                    <TextField
                        onChange={handleChange}
                        className={classes.rootItem}
                        autoFocus
                        margin="dense"
                        id="num"
                        label="Number of seats"
                        type="number"
                        value={values.num}
                    />
                    <TextField
                        onChange={handleChange}
                        disabled={idsDisabled}
                        className={classes.rootItem}
                        margin="dense"
                        id="seat_ids"
                        value={values.seat_ids}
                        label="Seat ID"
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDialog({ type: MAP_DIALOGS.CLOSE_SEAT })}>
                    Cancel
                </Button>
                <Button color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const useStyles = makeStyles(theme => ({
    textRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing(1)}px 0px`
    },
    rootItem: {
        flex: 1,
        "&:first-child": {
            marginRight: theme.spacing(1),
        },
        "&:last-child": {
            marginLeft: theme.spacing(1),
        }
    }
}))
export default SeatDialog;