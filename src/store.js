import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import authReducer from "./pages/auth/AuthReducer";
import loadingReducer from "./pages/loading/LoadingReducer";
import storeReducer from "./pages/store/storeReducer";
import { verifyOwner } from "./pages/auth/AuthActions";


export const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        combineReducers({
            auth: authReducer,
            backdrop: loadingReducer,
            store: storeReducer 
        }),
        {},
        composeEnhancers(applyMiddleware(thunk))
    );

    store.dispatch(verifyOwner());
    return store;
}

