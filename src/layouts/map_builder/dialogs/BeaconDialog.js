import React, { useState, useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MAP_DIALOGS } from "../util/const";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Grey from "@material-ui/core/colors/grey";
import update from "immutability-helper";

const BeaconClicks = {
    ADD: "ADD_BEACON",
    REMOVE: "REMOVE_BEACON",
    UPDATE: "UPDATE_BEACON"
}

const BeaconDialog = ({ open, handleDialog, data }) => {
    const classes = useStyles();
    const [beacons, setBeacons] = useState([]);
    const [beaconID, setBeaconID] = useState('');

    useEffect(() => {
        if (open) {
            setBeacons(data ? data : []);
        }
    }, [open, data])

    const handleChange = e => {
        setBeaconID(e.target.value);
    }

    const handleClick = (action) => {
        switch (action.type) {
            case BeaconClicks.ADD:
                setBeacons(update(beacons, { $push: [beaconID] }));
                setBeaconID('');
                break;
            case BeaconClicks.REMOVE:
                setBeacons(beacons.filter((beacon, idx) => idx !== action.data));
                break;
            case BeaconClicks.UPDATE:
                handleDialog({ type: MAP_DIALOGS.UPDATE_BEACON, data: beacons });
                setBeacons([]);
                break;
            default:
        }
    }
    const handleSubmit = e => {
        if (e) e.preventDefault();
        handleClick({ type: BeaconClicks.ADD });
    }
    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={() => handleDialog({ type: MAP_DIALOGS.CLOSE_BEACON })}
        >
            <DialogTitle>Edit Beacons</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please add a beacon ID.
                </DialogContentText>


                <form onSubmit={handleSubmit}>
                    <div className={classes.textRoot}>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            onChange={handleChange}
                            value={beaconID}
                            autoFocus
                            margin="dense"
                            id="beaconID"
                        />

                        <Button
                            onClick={() => handleClick({ type: BeaconClicks.ADD })}
                            variant="outlined"
                            className={classes.addBtn}>
                            Add
                        </Button>
                        <button style={{ display: 'none' }} type="submit" onSubmit={handleSubmit} />
                    </div>
                </form>

            </DialogContent>
            <List className={classes.list}>
                {beacons && beacons.map((beacon, idx) => (
                    <ListItem button key={idx}>
                        <ListItemText primary={beacon} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => handleClick({ type: BeaconClicks.REMOVE, data: idx })}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <DialogActions>
                <Button onClick={() => handleDialog({ type: MAP_DIALOGS.CLOSE_BEACON })}>
                    Cancel
                </Button>
                <Button color="primary" onClick={() => handleClick({ type: BeaconClicks.UPDATE })}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const useStyles = makeStyles(theme => ({
    textField: {
        margin: `${theme.spacing(1)}px 0px`
    },
    list: {
        margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
        border: `1px solid ${Grey['300']}`,
        overflow: 'auto',
        height: 200,
    },
    textRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addBtn: {
        marginLeft: theme.spacing(2),
    }
}));

export default BeaconDialog;