import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MAP_DIALOGS } from "../util/const";

const defaultValues = {
    name: '',
    height: '',
    width: '',
}
const MapDialog = ({ open, handleDialog }) => {
    const classes = useStyles();
    const [values, setValues] = useState(defaultValues);
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.id]: e.target.id === "name" ? e.target.value : Number(e.target.value),
        });
    }
    const handleSubmit = e => {
        if (e) e.preventDefault();
        handleDialog({ type: MAP_DIALOGS.ADD_MAP, data: values });
        setValues(defaultValues);
    }
    const handleClose = () => {
        setValues(defaultValues);
        handleDialog({ type: MAP_DIALOGS.CLOSE_MAP });
    }

    return (
        <Dialog
            maxWidth="xs"
            fullWidth
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Create a new map</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogContentText>
                        Enter name and size of a new map.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name of a map"
                        value={values.name}
                        fullWidth
                        onChange={handleChange}
                    />
                    <div className={classes.sizeRoot}>
                        <TextField
                            margin="dense"
                            id="height"
                            label="Height"
                            type="number"
                            className={classes.sizeText}
                            style={{ marginRight: 8 }}
                            value={values.height}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="width"
                            label="Width"
                            type="number"
                            className={classes.sizeText}
                            style={{ marginLeft: 8 }}
                            value={values.width}
                            onChange={handleChange}
                        />
                    </div>
                    <button style={{ display: 'none' }} type="submit" onSubmit={handleSubmit} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const useStyles = makeStyles(theme => ({
    sizeRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sizeText: {
        flex: 1,
    }
}))

export default MapDialog;