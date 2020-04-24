import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EventBusyIcon from "@material-ui/icons/EventBusy"
import Link from "react-router-dom/Link";
import URLS from "../../libs/urls";

const NoStoreAdded = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.innerRoot}>
                <EventBusyIcon className={classes.icon} />
                <Typography variant="body1" gutterBottom>
                    Add your first store now!
                </Typography>
                <Button variant="contained" component={Link} to={URLS.addStore} color="primary">
                    Create
                </Button>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1),
    },
    innerRoot: {
        textAlign: 'center'
    },
    icon: {
        height: 100,
        width: 100,
        marginBottom: theme.spacing(2),
    }
}))
export default NoStoreAdded;