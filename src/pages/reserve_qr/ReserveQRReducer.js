import { reserveActionType } from "./ReserveQRAction"; 
const initState = {
    seats: null,
    target_seat: null, 
    loaded: false,
    available: false, 
    completed: {
        value: false,
        returned_at: '', 
    } 
}

const reserveQRReducer = (state = initState, action) => {
    switch (action.type){
        case reserveActionType.get:
            return {
                ...state,
                seats: action.data,
                target_seat: action.target_seat,
                loaded: true,
                available: true, 
            }
        case reserveActionType.errGet:
            return {
                ...state,
                loaded: true, 
                available: false, 
            }
        case reserveActionType.useSeat:
            return {
                ...state,
                completed: {
                    value: true, 
                    returned_at: action.returned_at, 
                }
            }
        default:
            return state;
    }
}

export default reserveQRReducer;