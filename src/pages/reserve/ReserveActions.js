import { fireauth } from "../../libs/config";

export const getUserToken = () => async dispatch => {
    const idToken = await fireauth.currentUser.getIdToken(true)
    console.log(idToken);
}