import React, { useEffect, useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import MapBuilder from "../../layouts/map_builder/MapBuilder";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { updateMaps } from "../../pages/add_store/AddStoreActions";

const EditMap = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [maps, setMaps] = useState([]);
    const [seatGroups, setSeatGroups] = useState([]);
    const [beacons, setBeacons] = useState([]);
    const storeState = useSelector(state => state.store);

    useEffect(() => {
        if (!storeState.data) return;


        setBeacons(storeState.data.beacons);
        setMaps(storeState.data.maps);
        setSeatGroups(storeState.seatGroups);
    }, [storeState]);

    const handleSubmit = () => {
        const seatWithBeacons = seatGroups.map(seat => {
            let mapBeacons;
            try {
                mapBeacons = beacons.find(beacon => beacon.map_id === seat.map_id).beacon_ids;
            }
            catch (err) {
                mapBeacons = [];
            }

            return {
                ...seat,
                beacon_ids: mapBeacons,
            }
        });
        dispatch(updateMaps({
            maps,
            seatGroups: seatWithBeacons,
            beacons,
        }, () => history.push(`/admin/${storeState.sid}`)));
    }

    if (maps.length === 0 || seatGroups.length === 0 || beacons.length === 0) {
        return (
            <div>
                <Typography>
                    Loading...
                </Typography>
            </div>
        )
    }
    return (
        <div>
            <div className={classes.btnRoot}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disableElevation>
                    Save
                </Button>
            </div>
            <MapBuilder
                setBeacons={setBeacons}
                beacons={beacons}
                maps={maps}
                setMaps={setMaps}
                seatGroups={seatGroups}
                setSeatGroups={setSeatGroups}
            />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    btnRoot: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        "& button": {
            minWidth: 200,
        }
    }
}))
export default EditMap;