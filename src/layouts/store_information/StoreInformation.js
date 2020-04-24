import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const StoreInformation = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField
                variant="outlined"
                label="Store Name"
                fullWidth
                className={classes.textField}
            />
            <div className={classes.picRoot}>
                <div className={classes.picLabelRoot}>
                    <Typography variant="body1">
                        Select your store's picture.
                    </Typography>
                    <Button variant="contained" color="primary" disableElevation size="small">
                        Select
                    </Button>
                </div>
                <div className={classes.tempPic} />
            </div>

            <div className={classes.picRoot}>
                <div className={classes.picLabelRoot}>
                    <TextField
                        className={classes.postalCode}
                        label="Postal Code"
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" disableElevation size="small">
                        Search
                     </Button>
                </div>
            </div>
            <TextField
                className={classes.textField}
                label="Address"
                variant="outlined"
                fullWidth
            />
            <TextField
                className={classes.textField}
                label="Address Detail"
                variant="outlined"
                fullWidth
            />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    textField: {
        maxWidth: 360,
        margin: `${theme.spacing(1)}px 0px`
    },
    picRoot: {
        maxWidth: 360,
        margin: `${theme.spacing(1)}px auto`
    },
    picLabelRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tempPic: {
        width: '100%',
        height: 250,
        backgroundColor: 'grey',
        margin: `${theme.spacing(2)}px 0px`
    },
    postalCode: {
        width: 150,
    }

}))
export default StoreInformation;