import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, batch } from "react-redux";
import { setStore, subscribeStore, unsubscribeAll } from "./storeActions";
import MapViewer from "../../layouts/map_builder/MapViewer";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { VIEW_MODE } from "../../layouts/map_builder/util/const";

const Store = ({ match, history }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { data, seatGroups } = useSelector(state => state.store);

    useEffect(() => {
        const { sid } = match.params;
        batch(() => {
            dispatch(setStore(sid));
            dispatch(subscribeStore(sid));
        })

        return () => dispatch(unsubscribeAll());
    }, [match])

    useEffect(() => {
        console.log(data);
        console.log(seatGroups);
    }, [data, seatGroups])

    if (!data || !seatGroups || seatGroups.length <= 0) return null;

    return (
        <div >
            <Typography variant="body1" className={classes.title}>
                {`Number of people using: ${data.num_users}`}
            </Typography>

            <MapViewer
                maps={data.maps}
                beacons={data.beacons}
                seatGroups={seatGroups}
                mode={VIEW_MODE.Owner}
            />

        </div>
    )
}

const useStyles = makeStyles(theme => ({
    title: {
        marginLeft: `${theme.spacing(1)}`
    },
}))
export default withRouter(Store);