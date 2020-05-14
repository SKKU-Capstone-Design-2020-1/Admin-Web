import { signUpActionType, authActionType } from "./AuthActions";
import update from "immutability-helper";

const initState = {
    signup: {
        errMsg: '',
    },
    owner: {
        email: '',
        errMsg: '',
        uid: '',
        store_ids: [],
        //and other data from firestore
    }
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case signUpActionType.complete:
            return {
                signup: {
                    errMsg: ''
                },
                owner: action.data,
            };
        case signUpActionType.err:
            return {
                ...state,
                signup: {
                    errMsg: action.err
                }
            }
        case signUpActionType.init:
            return initState;
        case authActionType.complete:
            return update(state, {
                "owner": {
                    $set: {
                        ...action.data,
                        errMsg: '',
                    }
                }
            })

        case authActionType.err: {
            return update(state, {
                "owner": {
                    "errMsg": { $set: action.err }
                }
            })
        }
        case authActionType.signOut: {
            return initState;
        }
        default:
            return state;
    }
}


export default authReducer; 