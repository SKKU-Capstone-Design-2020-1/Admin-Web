import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import authReducer from "./pages/auth/AuthReducer";
import loadingReducer from "./pages/loading/LoadingReducer";
import signUpReducer from "./pages/signup/signUpReducer";

const store = createStore(
    combineReducers({
        auth: authReducer, 
        backdrop: loadingReducer,
        signup: signUpReducer, 
    }), 
    {},
    compose(applyMiddleware(thunk))
);

export default store;