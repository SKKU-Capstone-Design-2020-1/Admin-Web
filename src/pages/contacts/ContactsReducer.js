import { contactsActionType } from "./ContactsAction";

const initState = {
    data: [],
    loaded: false, 
}

const contactsReducer = (state = initState, action) => {
    switch (action.type) {
        case contactsActionType.get:
            return {
                ...state,
                data: action.data,
                loaded: true 
            }
        default:
            return state;
    }
}

export default contactsReducer; 