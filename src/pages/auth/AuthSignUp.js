import React, { useState, useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "./AuthActions";
const toSignIn = React.forwardRef((prop, ref) => (
    <RouterLink ref={ref} to="/" {...prop} />
))
const AuthSignUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const signup = useSelector(state => state.auth.signup);
    const [errMsg, setErrMsg] = useState('');
    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        confirm_password: '',
    })

    useEffect(() => {
        setErrMsg(signup.errMsg);
    }, [signup.errMsg])
    const handleChange = e => {
        setAuthData({
            ...authData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = e => {
        if (e) e.preventDefault();

        let completed = true;
        Object.keys(authData).forEach(key => {
            if (authData[key] === '') completed = false;
        })
        if (!completed) {
            setErrMsg("Please complete the form");
            return;
        }
        if (authData.password !== authData.confirm_password) {
            setErrMsg("Confirm password does not match.");
            return;
        }
        console.log(authData);
        dispatch(signUp(authData));
    }
    return (
        <div className={classes.root}>
            <div className={classes.container} >
                <Typography variant="body1" className={classes.title}>
                    Realtime Seat Reservation
                </Typography>
                <Typography variant="body1" className={classes.subTitle}>
                    Sign up to deploy innovative seat management system to your places immediately.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        onChange={handleChange}
                        value={authData.email}
                        className={classes.textField}
                        fullWidth
                        variant="outlined"
                        id="email"
                        type="email"
                        label="Email" />
                    <TextField
                        onChange={handleChange}
                        value={authData.password}
                        className={classes.textField}
                        fullWidth
                        variant="outlined"
                        id="password"
                        type="password"
                        label="Password" />
                    <TextField
                        onChange={handleChange}
                        value={authData.confirm_password}
                        className={classes.textField}
                        fullWidth
                        variant="outlined"
                        id="confirm_password"
                        type="password"
                        label="Confirm password" />
                    <button style={{ display: 'none' }} type="submit" onSubmit={handleSubmit} />
                </form>

                <Typography variant="body1" color="secondary">
                    {errMsg}
                </Typography>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    onClick={handleSubmit}
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
export default AuthSignUp