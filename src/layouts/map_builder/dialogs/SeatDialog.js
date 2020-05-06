import React, { useEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typograhy from "@material-ui/core/Typography";
import { MAP_DIALOGS } from "../util/const";

const defaultValue = {
    num: '',
    seat_names: '',
}
const SeatDialog = ({ open, handleDialog, seat_groups = [] }) => {
    const classes = useStyles();
    const [values, setValues] = useState(defaultValue);
    const [idsDisabled, setIdsDisabled] = useState(true);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (values.num === '') {
            setIdsDisabled(true);
            setValues({
                ...values,
                seat_names: '',
            });
        }
        else {
            let seat_names = '';
            let num = Number(values.num);
            for (let i = seat_groups.length + 1; i <= num; i++) {
                seat_names = seat_names + i;
                if (i !== num) seat_names = seat_names + ",";
            }
            setIdsDisabled(false);
            setValues({
                ...values,
                seat_names
            });
        }
    }, [values.num]);
    useEffect(() => {
        if (open === false){
            setValues(defaultValue);
            setIdsDisabled(true);
            setErrMsg('');
        }
    }, [open])

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = e => {
        if (e) e.preventDefault();

        if (values.num === '' || values.seat_names === '') {
            setErrMsg("Please complete the form.");
            return;
        }
        //check uniqueness of ids
        let names = values.seat_names.split(',');
        names.forEach(name => {
            seat_groups.forEach(seat => {
                if (seat_groups.name === name) {
                    setErrMsg("Seat name must be unique in each map.");
                    return 0;
                }
            })
        })

        //if all ids are unique
        handleDialog({ type: MAP_DIALOGS.ADD_SEAT, data: values });
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
                <form onSubmit={handleSubmit}>
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
                            id="seat_names"
                            value={values.seat_names}
                            label="Seat ID"
                        />
                    </div>
                    <button style={{ display: 'none' }} type="submit" onSubmit={handleSubmit} />
                </form>
                <Typograhy variant="body1" color="secondary" className={classes.errMsg}>
                    {errMsg}
                </Typograhy>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDialog({ type: MAP_DIALOGS.CLOSE_SEAT })}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
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
    },
    errMsg: {
        padding: `${theme.spacing(1)}px 0px`
    }
}))
export default SeatDialog;