import { reserveActionType } from "./ReserveActions";

const initState = {
    loaded: false, 
    verified: false,
    user: null, 
}

const reserveReducer = (state = initState, action) => {
    switch (action.type){
        case reserveActionType.verifyUserToken:
            return {
                ...state,
                loaded: true, 
                verified: true,
                user: action.data, 
            }
        case reserveActionType.notVerified:
            return {
                ...state,
                loaded: true, 
                verified: false,
                user: null, 
            }
        default:
            return state;
    }
}

export default reserveReducer;