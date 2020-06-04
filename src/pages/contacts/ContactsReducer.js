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
        case contactsActionType.update:
            return {
                ...state,
                data: state.data.map(data => {
                    if (data.id === action.data.id) {
                        return action.data;
                    }  
                    else {
                        return data;
                    }
                })
            }
        default:
            return state;
    }
}

export default contactsReducer; 