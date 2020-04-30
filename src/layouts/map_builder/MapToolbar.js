import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SeatIcon from "@material-ui/icons/EventSeat";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import EditIcon from "@material-ui/icons/Edit";

const MapToolbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ButtonGroup className={classes.group} size="small">
                <Button>
                    <AddIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup className={classes.group} size="small">
                <Button>
                    <SeatIcon />
                </Button>
                <Button>
                    <RotateLeftIcon />
                </Button>
                <Button>
                    <RotateRightIcon />
                </Button>
                <Button>
                    <EditIcon />
                </Button>
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