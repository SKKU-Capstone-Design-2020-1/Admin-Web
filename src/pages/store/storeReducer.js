import { storeActionType } from "./storeActions";

const initState = {
    sid: '',
    data: null,
    seatGroups: [],
}

const storeReducer = (state = initState, action) => {
    switch (action.type) {
        case storeActionType.setStore:
            return {
                ...state,
                sid: action.data
            }
        case storeActionType.responseStore:
            console.log(action.data); 
            return {
                ...state,
                data: action.data.store_data,
                seatGroups: action.data.seatGroups_data
            }
        default:
            return state;
    }
}

export default storeReducer;