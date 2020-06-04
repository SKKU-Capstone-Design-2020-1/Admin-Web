import { fireauth } from "../../libs/config";
import axios from "axios";

const base_url = "https://us-central1-seat-reservation-2600f.cloudfunctions.net";

export const reserveActionType = {
    verifyUserToken: "verifyUserTokenReserve",
    notVerified: "verifyUserTokenFailed"
}
export const getUserToken = () => async dispatch => {
    const idToken = await fireauth.currentUser.getIdToken(true)
    console.log(idToken);
}

export const verifyToken = token => async dispatch => {
    try {
        let resp = await axios.post(`${base_url}/checkToken`, {
            idToken: token
        });

        console.log(resp.data);
        if (resp.data.success) {
            dispatch({ type: reserveActionType.verifyUserToken, data: resp.data.user });
        }
        else {
            dispatch({type: reserveActionType.notVerified});
        }

    } catch (err) {
        console.log(err);
        dispatch({type: reserveActionType.notVerified});
    }
}