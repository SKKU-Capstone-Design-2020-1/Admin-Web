import React, { useEffect } from 'react'
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStore } from "./storeActions";
const Store = ({ match, history }) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setStore(match.params.sid));
    }, [match])
    return (
        <div>
            {match.params.sid}
            <button onClick={() => history.push("/admin/add_store")}>
                Add
            </button>
        </div>
    )
}

export default withRouter(Store);