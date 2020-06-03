import React, { useEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import qs from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { getStoreInfo, reserveSeat } from "./ReserveQRAction";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

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
    const { target_seat, loaded, available, completed } = useSelector(state => state.qr);
    const [info, setInfo] = useState(null)
    const [minutes, setMinutes] = useState("");

    useEffect(() => {
        const parse = qs.parse(location.search);
        setInfo(parse);
        dispatch(getStoreInfo(parse));
    }, [])

    const handleUser = () => {
        dispatch(reserveSeat({ ...info, minutes}))
    }

    const handleChange = e => {
        setMinutes(Number(e.target.value))
    }

    if (!loaded) return null;
    if (!available || target_seat && target_seat.status > 0) {
        return (
            <Container className={classes.root} maxWidth="xs">
                <Typography variant="body1" align="center">
                    This seat is not available
                </Typography>
            </Container>
        )
    }
    if (completed.value) {
        return (
            <Container className={classes.root} maxWidth="xs">
                <Typography variant="body1" align="center">
                    {`This seat is occupied until ${moment(completed.returned_at).calendar()}`}
                </Typography>
            </Container>
        )
    }

    return (
        <Container className={classes.root} maxWidth="xs">
            <div>
                <FormControl className={classes.form} >
                    <InputLabel >Usage Time (minutes)</InputLabel>
                    <Select id="setMinute" value={minutes} onChange={handleChange}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {getMinutes().map(minute => (
                            <MenuItem key={minute} value={minute}>
                                {minute}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    onClick={handleUser}
                    fullWidth
                    className={classes.btn}
                    variant="contained"
                    color="primary">
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