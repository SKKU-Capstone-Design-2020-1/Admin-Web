import { firestore } from "../../libs/config";
import { setProgress, completeProgress } from "../loading/LoadingAction";

export const reserveActionType = {
    get: "GetReserveQR"
}
export const getStoreInfo = (info) => async dispatch => {
    const { sid, map_id, seat_id, id } = info;
    dispatch(setProgress);

    try {
        let seatResp = await firestore.collection(`stores/${sid}/seatGroups`).where('seat_id', '==', seat_id).limit(1).get();
         if (seatResp.docs.length === 0) {
            throw "err"
        }


        dispatch({ type: reserveActionType.get, data: seatResp.docs[0].data() });
    } catch (err) {
        console.log(err);
    }
    dispatch(completeProgress);
}