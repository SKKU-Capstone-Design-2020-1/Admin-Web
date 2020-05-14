import { fireauth, firestore } from "../../libs/config";
import { setProgress, completeProgress } from "../loading/LoadingAction";

export const signUpActionType = {
    complete: 'authSignUpComplete',
    err: 'authSignUpError',
    init: 'initSignUp'
}
export const authActionType = {
    complete: 'authComplete',
    err: 'authSignUpErr',
}

export const signUp = ({ email, password }) => async dispatch => {
    dispatch(setProgress);
    dispatch({ type: signUpActionType.init })
    try {

        let resp = await fireauth.createUserWithEmailAndPassword(email, password);
        console.log(resp);

        let { user } = resp;

        await firestore.collection("owners").doc(user.uid).set({
            email: user.email,
            store_ids: [],
            uid: user.uid,
        });

        dispatch({
            type: signUpActionType.complete, data: {
                email: user.email,
                uid: user.uid,
                store_ids: [],
            }
        });
    } catch (err) {
        dispatch({ type: signUpActionType.err, err: err.message })
    }
    dispatch(completeProgress);
}

export const verifyOwner = () => async dispatch => {
    dispatch(setProgress);
    try {
        fireauth.onAuthStateChanged(async user => {
            //get store ids from database
            let { email, uid } = user;
            let ownerResp = await firestore.doc(`owners/${uid}`).get();
            let { store_ids } = ownerResp.data();

            dispatch({
                type: authActionType.complete, data: {
                    email: email,
                    uid: uid,
                    store_ids, 
                }
            });
        })
    } catch (err) {
        dispatch({ type: authActionType.err, err: err.message });
    }
    dispatch(completeProgress);
}