import { storage, firestore, firebaseApp } from "../../libs/config";
import { setProgress, completeProgress } from "../loading/LoadingAction";
import { authActionType } from "../auth/AuthActions";

export const registerStore = (data, callback) => async (dispatch, getState) => {
    dispatch(setProgress);
    try {
        const state = getState();
        const oid = state.auth.owner.uid;
        const { storeData, maps, seatGroups } = data;

        const { img_file, ...storeInfo } = storeData;

        let num_seats = 0;

        let updatedSeats = seatGroups.map(group => {
            num_seats += group.seats.length;
            const { clicked, ...others } = group;
            return others;
        });

        let storeDoc = firestore.collection('stores').doc();

        //Add image to firebase storage
        const storageRef = storage.ref();
        const imgRef = storageRef.child(`stores/${oid}/${storeDoc.id}/store_img`);

        await imgRef.put(img_file);
        let img_url = await imgRef.getDownloadURL();

        let batch = firestore.batch();
        batch.set(storeDoc, {
            open: false,
            num_seats,
            num_users: 0,
            img_url,
            maps,
            owner_id: oid,
            created_at: new Date(),
            ...storeInfo
        });
        for (let group of updatedSeats) {
            batch.set(storeDoc.collection(`seatGroups`).doc(), group);
        }

        //update store_ids on owner document
        batch.update(firestore.doc(`owners/${oid}`), {
            store_ids: firebaseApp.firestore.FieldValue.arrayUnion({ id: storeDoc.id, name: storeInfo.name })
        });

        await batch.commit();
        callback(storeDoc.id);
        dispatch({ type: authActionType.addStore, data: { id: storeDoc.id, name: storeInfo.name } });
    } catch (err) {
        console.log(err);

    }
    dispatch(completeProgress);
}