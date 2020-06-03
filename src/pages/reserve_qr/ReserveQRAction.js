import { firestore } from "../../libs/config";
import { setProgress, completeProgress } from "../loading/LoadingAction";
import moment from "moment";

export const reserveActionType = {
    get: "GetReserveQR",
    errGet: "ErrorGetReserveQr",
    useSeat: "UseReserveQRSeat"
}
export const getStoreInfo = (info) => async dispatch => {
    const { sid, seat_id } = info;
    dispatch(setProgress);

    try {
        let seatResp = await firestore.collection(`stores/${sid}/seatGroups`).where('seat_id', '==', seat_id).limit(1).get();
        if (seatResp.docs.length === 0) {
            throw "err"
        }

        const seats = {
            ...seatResp.docs[0].data(),
            doc_id: seatResp.docs[0].id
        };

        const target_seat = seats.seats.find(seat => seat.id === info.id);
        if (!target_seat) throw "err";

        dispatch({
            type: reserveActionType.get, data: seats, target_seat 
        });
    } catch (err) {
        dispatch({ type: reserveActionType.errGet })
    }
    dispatch(completeProgress);
}


export const reserveSeat = (info) => async (dispatch, getState) => {
    dispatch(setProgress);

    const { sid, id, minutes } = info;
    const qrState = getState().qr;
    try {
        const batch = firestore.batch();
        const updatedSeats = qrState.seats.seats.map(seat => {
            if (seat.id === info.id){
                return {
                    ...seat,
                    status: 2
                }
            }
            else return seat;
        })


        batch.update(firestore.doc(`stores/${sid}/seatGroups/${qrState.seats.id}`), {
            seats: updatedSeats
        });

    
        const returned_at = moment().add(minutes, "minutes").toDate();
        
        batch.set(firestore.collection(`qr_reserves`).doc(), {
            ...info, 
            returned_at,
            seat_grou_id: qrState.seats.id, 
        });

        await batch.commit();
        dispatch({ type: reserveActionType.useSeat, returned_at });
    } catch (err) {
        console.log(err);
    }
    dispatch(completeProgress);
}