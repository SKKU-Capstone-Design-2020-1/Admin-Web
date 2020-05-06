import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MAP_DIALOGS } from "../util/const";

const SeatDialog = ({ open, handleDialog, }) => {
    const classes = useStyles();


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
                        className={classes.rootItem}
                        autoFocus
                        margin="dense"
                        id="num"
                        label="Number of seats"
                        type="number"
                    />
                    <TextField
                        className={classes.rootItem}
                        autoFocus
                        margin="dense"
                        id="id"
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