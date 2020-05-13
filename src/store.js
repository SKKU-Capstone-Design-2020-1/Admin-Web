import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import authReducer from "./pages/auth/AuthReducer";
import loadingReducer from "./pages/loading/LoadingReducer";

const store = createStore(
    combineReducers({
        auth: authReducer, 
        backdrop: loadingReducer
    }), 
    {},
    compose(applyMiddleware(thunk))
);

export default store;