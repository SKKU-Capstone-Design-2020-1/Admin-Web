import { signUpActionType } from "./SignUpActions";

const initState = {
    errMsg: '', 
}
const signUpReducer = (state = initState, action) => {
    switch(action.type){
        case signUpActionType.complete:
            return initState;
        case signUpActionType.err:
            return {
                errMsg: action.err
            }
        case signUpActionType.init:
            return initState;
        default:
            return state;
    }   
}

export default signUpReducer;