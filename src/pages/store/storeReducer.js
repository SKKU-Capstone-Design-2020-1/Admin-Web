import { storeActionType } from "./storeActions";

const initState = {
    sid: '',
    data: null,
    seatGroups: [],
    unsubscribe:{
        store: null,
        seat: null
    }
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

        case storeActionType.setUnsubscribe:
            return {
                ...state,
                unsubscribe: action.data
            }
        case storeActionType.unsubscribeStore:
            return {
                ...state,
                unsubscribe: {
                    store: null,
                    seat: null, 
                }
            }
        case storeActionType.respSeatData:
            return {
                ...state,
                seatGroups: action.data
            }
        case storeActionType.respStoreData:
            return {
                ...state,
                data: action.data
            }
        case storeActionType.ownerUpdateMap:
            return state;
            
        default:
            return state;
    }
}

export default storeReducer;