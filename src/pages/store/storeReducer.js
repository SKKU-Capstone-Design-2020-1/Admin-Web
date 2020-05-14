import { storeActionType } from "./storeActions";

const initState = {
    sid: '',
}

const storeReducer = (state = initState, action) => {
    switch (action.type) {
        case storeActionType.setStore:
            return {
                ...state,
                sid: action.data
            }
        default:
            return state;
    }
}

export default storeReducer;