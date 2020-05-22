import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStore, subscribeStore, unsubscribeAll } from "./storeActions";
import MapViewer from "../../layouts/map_builder/MapViewer";


const Store = ({ match, history }) => {
    const dispatch = useDispatch();
    const { data, seatGroups } = useSelector(state => state.store);

    useEffect(() => {
        const { sid } = match.params;
        dispatch(setStore(sid));
        dispatch(subscribeStore(sid));
        return () => dispatch(unsubscribeAll());
    }, [match])

    useEffect(() => {
        console.log(data);
        console.log(seatGroups);
    }, [data, seatGroups])



    return (
        <div>
            {data && seatGroups && seatGroups.length > 0 &&
                <MapViewer
                    maps={data.maps}
                    beacons={data.beacons}
                    seatGroups={seatGroups}

                />
            }

        </div>
    )
}

export default withRouter(Store);