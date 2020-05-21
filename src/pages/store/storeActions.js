import { setProgress, completeProgress } from "../loading/LoadingAction";
import { firestore } from "../../libs/config";
export const storeActionType = {
    setStore: "setStore",
    requestStore: "requestStore",
    responseStore: "responseStore",
}

export const setStore = sid => dispatch => {
    dispatch({ type: storeActionType.setStore, data: sid})
}
export const getStore = sid => async (dispatch, getState) => {
    const state = getState().store;
    

    if (state.data && state.data.id === sid) {
        return;
    }
    try {
        dispatch(setProgress);
        let promises = [];
        promises.push(firestore.doc(`stores/${sid}`).get());
        promises.push(firestore.collection(`stores/${sid}/seatGroups`).get());

        let promises_snap = await Promise.all(promises);
        let store_data = {
            ...promises_snap[0].data(),
            id: promises_snap[0].id,
        }

        let seatGroups_data = [];
        for (let seat_doc of promises_snap[1].docs) {
            seatGroups_data.push({
                ...seat_doc.data(),
                id: seat_doc.id
            })
        };


        dispatch({
            type: storeActionType.responseStore, data: {
                store_data, seatGroups_data
            }
        });
    } catch (err) {
        console.log(err);
    }
    dispatch(completeProgress);
}