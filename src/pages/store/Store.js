import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStore, getStore } from "./storeActions";
const Store = ({ match, history }) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const { sid } = match.params;
        dispatch(setStore(sid));
        dispatch(getStore(sid));
    }, [match])
    return (
        <div>
            {match.params.sid}
        </div>
    )
}

export default withRouter(Store);