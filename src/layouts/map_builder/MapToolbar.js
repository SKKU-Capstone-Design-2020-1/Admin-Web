import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import SeatIcon from "@material-ui/icons/EventSeat";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import EditIcon from "@material-ui/icons/Edit";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import RemoveLocationIcon from "@material-ui/icons/LocationOff";
import Tooltip from "@material-ui/core/Tooltip";

const MapToolbar = ({ handleDialog }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ButtonGroup className={classes.group} size="small">
                <Tooltip title="Add a new map">
                    <Button onClick={() => handleDialog({ type: 'MAP_DIALOG' })}>
                        <AddLocationIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Edit selected map">
                    <Button >
                        <EditLocationIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Remove selected map">
                    <Button>
                        <RemoveLocationIcon />
                    </Button>
                </Tooltip>
            </ButtonGroup>
            <ButtonGroup className={classes.group} size="small">
                <Tooltip title="Add a seat">
                    <Button>
                        <SeatIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Rotate seat to left">
                    <Button>
                        <RotateLeftIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Rotate seat to right">
                    <Button>
                        <RotateRightIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Edit selected seat">
                    <Button>
                        <EditIcon />
                    </Button>
                </Tooltip>

            </ButtonGroup>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: theme.spacing(1),
    },
    group: {
        marginRight: theme.spacing(1),
    }
}))
export default MapToolbar