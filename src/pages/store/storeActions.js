import { setProgress, completeProgress } from "../loading/LoadingAction";
import { firestore } from "../../libs/config";
export const storeActionType = {
    setStore: "setStore",
    requestStore: "requestStore",
    responseStore: "responseStore",
    subscribeStore: "subscribeStore",
    unsubscribeStore: "unsubscribeStore",
    respStoreData: "snapStoreData",
    respSeatData: "snapSeatData",
    setUnsubscribe: "setUnsubscribeStore"
}

export const setStore = sid => dispatch => {
    dispatch({ type: storeActionType.setStore, data: sid })
}

export const unsubscribeAll = () => (dispatch, getState) => {
    const state = getState().store;
    
    if (state.unsubscribe.store) state.unsubscribe.store();
    if (state.unsubscribe.seat) state.unsubscribe.seat();
    
    dispatch({ type: storeActionType.unsubscribeStore })
}

export const subscribeStore = sid => async (dispatch, getState) => {
    const state = getState().store;
    if (state.data && state.data.id === sid) return;

    try {
        dispatch(setProgress);

        //unsubscribe
        if (state.unsubscribe.store) state.snapshot.store();
        if (state.unsubscribe.seat) state.snapshot.seat();

        const unsub_store = firestore.doc(`stores/${sid}`).onSnapshot(store_doc => {
            let store_data = {
                ...store_doc.data(),
                id: store_doc.id,
            }

            dispatch({ type: storeActionType.respStoreData, data: store_data });
        });
        const unsub_seat = firestore.collection(`stores/${sid}/seatGroups`).onSnapshot(seat_collection => {
            let seatGroups = []
            for (let seat_doc of seat_collection.docs) {
                seatGroups.push({
                    ...seat_doc.data(),
                    id: seat_doc.id
                })
            }

            dispatch({ type: storeActionType.respSeatData, data: seatGroups })
        });

        dispatch({
            type: storeActionType.setUnsubscribe, data: {
                store: unsub_store,
                seat: unsub_seat,
            }
        })
    } catch (err) {
        console.log(err);
    }
    dispatch(completeProgress);
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