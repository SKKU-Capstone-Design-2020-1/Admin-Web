import { signUpActionType } from "./AuthActions";

const initState = {
    signup: {
        errMsg: '', 
    },
    owner: {
        email: '',
        uid: '',
        store_ids: [], 
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
        default: 
            return state;
    }
}


export default authReducer; 