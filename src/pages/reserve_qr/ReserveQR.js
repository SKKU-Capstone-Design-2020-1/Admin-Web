import React, { useEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import qs from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { getStoreInfo } from "./ReserveQRAction";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

const getMinutes = () => {
    const minutes = [];
    for (let i = 1; i <= 10; i++) {
        minutes.push(i * 30);
    }

    return minutes;
}

const ReserveQR = ({ location }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { seats, loaded, available } = useSelector(state => state.qr);
    const [info, setInfo] = useState(null)
    useEffect(() => {
        const parse = qs.parse(location.search);
        setInfo(parse);
        dispatch(getStoreInfo(parse));
    }, [])

 
    if (!loaded) return null;
    if (!available) {
        return (
            <Container className={classes.root} maxWidth="xs">
                <Typography variant="body1" >
                    This seat is not available
                </Typography>
            </Container>
        )
    }

    return (
        <Container className={classes.root} maxWidth="xs">
            <div>
                <FormControl className={classes.form} >
                    <InputLabel >Usage Time</InputLabel>
                    <Select id="setMinute" value={30}>
                        {getMinutes().map(minute => (
                            <MenuItem key={minute} value={minute}>
                                {minute}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button fullWidth className={classes.btn} variant="contained" color="primary">
                    Use Seat
                </Button>
            </div>
        </Container>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },
    form: {
        width: '100%'
    },
    btn: {
        marginTop: theme.spacing(2)
    }
}))
export default ReserveQR;