import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

const toSignIn = React.forwardRef((prop, ref) => (
    <RouterLink ref={ref} to="/" {...prop} />
))
const SignUp = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.container} >
                <Typography variant="body1" className={classes.title}>
                    Realtime Seat Reservation
                </Typography>
                <Typography variant="body1" className={classes.subTitle}>
                    Sign up to deploy innovative seat management system to your places immediately.
                </Typography>
                <TextField
                    className={classes.textField}
                    fullWidth
                    variant="outlined"
                    id="email"
                    type="email"
                    label="Email" />
                <TextField
                    className={classes.textField}
                    fullWidth
                    variant="outlined"
                    id="password"
                    type="password"
                    label="Password" />
                <TextField
                    className={classes.textField}
                    fullWidth
                    variant="outlined"
                    id="confirm_password"
                    type="password"
                    label="Confirm password" />

                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                >
                    Sign Up
                </Button>

                <Link component={toSignIn} className={classes.link}>
                    Have account?
                </Link>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: Grey['100'],
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        maxWidth: 350,
        background: 'white',
        border: `1.5px solid ${Grey['200']}`,
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    title: {
        fontWeight: 600,
        fontSize: '1.2rem',
        textAlign: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    subTitle: {
        color: Grey['700'],
        marginBottom: theme.spacing(3),
    },
    textField: {
        margin: `${theme.spacing(1) / 2}px 0px`
    },
    button: {
        margin: `${theme.spacing(2)}px 0px`,
        height: 50,
    },
    link: {
        fontSize: '0.9rem',
        color: 'grey',
        "&:hover": {
            color: theme.palette.primary.main
        }
    }
}))
export default SignUp