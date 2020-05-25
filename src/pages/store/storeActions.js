import { setProgress, completeProgress } from "../loading/LoadingAction";
import { firestore, firebaseApp } from "../../libs/config";
import update from "immutability-helper";

export const storeActionType = {
    setStore: "setStore",
    requestStore: "requestStore",
    responseStore: "responseStore",
    subscribeStore: "subscribeStore",
    unsubscribeStore: "unsubscribeStore",
    respStoreData: "snapStoreData",
    respSeatData: "snapSeatData",
    setUnsubscribe: "setUnsubscribeStore",
    ownerUpdateMap: "updateMapOwner",
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
        if (state.unsubscribe.store) state.unsubscribe.store();
        if (state.unsubscribe.seat) state.unsubscribe.seat();

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

export const ownerSeatUpdate = (data, callback) => async (dispatch, getState) => {
    //if callback exists => reservation
    //if callback does not exist => owner updating map
    try {
        const { seat_id, selected_idx } = data;

        const state = getState();
        const { seatGroups, sid } = state.store;

        let seatIdx = seatGroups.findIndex(seat => seat.seat_id === seat_id);
        let updatedSeats = update(seatGroups, {
            [seatIdx]: {
                "seats": {
                    [selected_idx]: {
                        "status": { $set: seatGroups[seatIdx].seats[selected_idx].status === 0 ? 2 : 0 }
                    }
                }
            }
        })[seatIdx].seats;


        let batch = firestore.batch();
        batch.update(firestore.doc(`stores/${sid}/seatGroups/${data.id}`), {
            seats: updatedSeats
        });
        batch.update(firestore.doc(`stores/${sid}`), {
            num_users: firebaseApp.firestore.FieldValue.increment(updatedSeats[selected_idx].status === 0 ? -1 : 1)
        });

        await batch.commit();
        if (callback){
            callback();
        }
        dispatch({ type: storeActionType.ownerUpdateMap });
    } catch (err) {
        console.log(err);
    }
    dispatch(completeProgress);
}
