import { reserveActionType } from "./ReserveQRAction"; 
const initState = {
    seats: null,
    loaded: false
}

const reserveQRReducer = (state = initState, action) => {
    switch (action.type){
        case reserveActionType.get:
            console.log(action.data);
            return {
                ...state,
                seats: action.data,
                loaded: true 
            }
        default:
            return state;
    }
}

export default reserveQRReducer;