import { fireauth, firestore } from "../../libs/config";
import { setProgress, completeProgress } from "../loading/LoadingAction";

export const signUpActionType = {
    complete: 'authSignUpComplete',
    err: 'authError',
    init: 'initSignUp'
}

export const signUp = ({ email, password }) => async dispatch => {
    dispatch(setProgress);
    dispatch({ type: signUpActionType.init })
    try {

        let userResp = await fireauth.createUserWithEmailAndPassword(email, password);
        console.log(userResp);

        let { user } = userResp;

        await firestore.collection("owners").doc(user.uid).set({
            email: user.email,
            store_ids: [],
            uid: user.uid,
        });

        dispatch({ type: signUpActionType.complete, data: {
            email: user.email,
            uid: user.uid, 
            store_ids: [], 
        } });
    } catch (err) {
        dispatch({ type: signUpActionType.err, err: err.message })
    }
    dispatch(completeProgress);
}

