import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const NoStoreAdded = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.innerRoot}>
                <Typography variant="body1" gutterBottom>
                    Add your first store now!
                </Typography>
                <Button variant="contained" color="primary">
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
    }
}))
export default NoStoreAdded;