import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import authReducer from "./pages/auth/AuthReducer";

const store = createStore(
    combineReducers({
        auth: authReducer, 
    }), 
    {},
    compose(applyMiddleware(thunk))
);

export default store;