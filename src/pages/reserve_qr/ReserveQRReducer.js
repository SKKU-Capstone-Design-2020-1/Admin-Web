import { reserveActionType } from "./ReserveQRAction"; 
const initState = {
    seats: null,
    loaded: false,
    available: false, 
}

const reserveQRReducer = (state = initState, action) => {
    switch (action.type){
        case reserveActionType.get:
            console.log(action.data);
            return {
                ...state,
                seats: action.data,
                loaded: true,
                available: true, 
            }
        case reserveActionType.errGet:
            return {
                ...state,
                loaded: true, 
                available: false, 
            }
        default:
            return state;
    }
}

export default reserveQRReducer;