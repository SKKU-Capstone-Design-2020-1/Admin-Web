import { LoadingActionType } from "./LoadingAction";

const initState = {
    loading: false 
}

const loadingReducer = (state = initState, action) => {
    switch (action.type) {
        case LoadingActionType.complete:
            return {
                loading: false 
            }
        case LoadingActionType.set:
            return {
                loading: true
            }
        default:
            return state;
    }
}

export default loadingReducer;