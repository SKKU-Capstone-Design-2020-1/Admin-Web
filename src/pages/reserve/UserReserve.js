import React, { useEffect } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import qs from "query-string";
import { useDispatch, useSelector, batch } from "react-redux";
import { subscribeStore, unsubscribeAll, setStore } from "../store/storeActions";
import Grey from "@material-ui/core/colors/grey";
import MapViewer from "../../layouts/map_builder/MapViewer";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { VIEW_MODE } from "../../layouts/map_builder/util/const";

const UserReserve = ({ location }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { data, seatGroups } = useSelector(state => state.store);
    console.log(data, seatGroups);
    useEffect(() => {
        let query = qs.parse(location.search);
        batch(() => {
            dispatch(subscribeStore(query.sid));
            dispatch(setStore(query.sid));
        })

        return () => dispatch(unsubscribeAll());
    }, [location])

    useEffect(() => {
        console.log(data);
        console.log(seatGroups);
    }, [data, seatGroups])

    if (!data || !seatGroups || seatGroups.length <= 0) return (
        <Backdrop className={classes.Backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
    return (
        <div className={classes.root}>
            <div className={classes.mapWrapper}>
                <Typography variant="body1" gutterBottom>
                    Please select a seat
                </Typography>
                <MapViewer
                    maps={data.maps}
                    beacons={data.beacons}
                    seatGroups={seatGroups}
                    drawerVisible={false}
                    mode={VIEW_MODE.Reserve}
                />
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: `${theme.spacing(5)}px ${theme.spacing(1)}px`,
        height: '100vh',
        width: `calc(100vw - ${theme.spacing(2)}px)`,
        backgroundColor: Grey['100'],
        display: "flex"
    },
    mapWrapper: {
        margin: '0px auto'
    },
    Backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.dark
    }
}))
export default UserReserve;