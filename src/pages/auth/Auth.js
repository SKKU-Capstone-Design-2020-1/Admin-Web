import React, { useState } from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useSelector } from "react-redux"
import Grey from "@material-ui/core/colors/grey";
import { Link as RouterLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux"
import { signIn } from "./AuthActions";

const toSignUp = React.forwardRef((prop, ref) => (
    <RouterLink ref={ref} to="/signup" {...prop} />
))

const Auth = () => {
    const classes = useStyles();
    const { owner, signin } = useSelector(state => state.auth);
    const [creds, setCreds] = useState({
        email: '',
        password: '',
    })
    const dispatch = useDispatch();

    if (owner.uid) {
        return <Redirect to="/admin" />
    }
    const handleSubmit = e => {
        if (e) e.preventDefault();

        dispatch(signIn(creds));
    }
    const handleChange = e => {
        setCreds({
            ...creds,
            [e.target.id]: e.target.value,
        })
    }
    return (
        <div className={classes.root}>
            <form onSubmit={handleSubmit}>
                <div className={classes.rootField}>
                    <Typography variant="body1" className={classes.title}>
                        Realtime Seat Reservation
                </Typography>
                    <Typography varaint="body1" className={classes.typoHint}>
                        This page can be accessed only by admins.
                </Typography>

                    <TextField
                        className={classes.textField}
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={creds.email}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.textField}
                        id="password"
                        label="Password"
                        type="password"
                        value={creds.password}
                        onChange={handleChange}
                        variant="outlined"
                    />



                    <div className={classes.rootTextBtns}>
                        <Typography>
                            <Link href="#" className={classes.link} onClick={e => e.preventDefault}>
                                Forgot Password?
                        </Link>
                            <Link component={toSignUp} className={classes.link} onClick={e => e.preventDefault}>
                                Sign Up
                        </Link>
                        </Typography>
                    </div>
                    <Typography variant="body1" color="secondary" className={classes.errMsg}>
                        {signin.errMsg}
                    </Typography>
                    <Button className={classes.button}
                        fullWidth
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={handleSubmit}
                    >
                        Sign In
                </Button>

                </div>
                <button type="submit" style={{ display: 'none' }} onSubmit={handleSubmit} />
            </form>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: Grey['100'],
    },
    textField: {
        width: 300,
        margin: `${theme.spacing(1) / 2}px 0px`
    },
    rootField: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        backgroundColor: 'white',
        border: `1.5px solid ${Grey['200']}`
    },
    button: {
        marginTop: theme.spacing(2),
        height: 50,
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 600,
        textAlign: 'center',
        marginTop: `${theme.spacing(5)}px`
    },
    rootTextBtns: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    link: {
        marginLeft: theme.spacing(3),
        fontSize: '0.9rem',
        color: 'grey',
        "&:hover": {
            color: theme.palette.primary.main
        }
    },
    typoHint: {
        fontSize: '0.9rem',
        color: 'grey',
        marginBottom: theme.spacing(5),
        textAlign: 'center'
    },
    errMsg: {
        marginTop: theme.spacing(1),
        maxWidth: 300,
    }
}));

export default Auth;