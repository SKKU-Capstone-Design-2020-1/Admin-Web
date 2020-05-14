import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import authReducer from "./pages/auth/AuthReducer";
import loadingReducer from "./pages/loading/LoadingReducer";
import storeReducer from "./pages/store/storeReducer";
import { verifyOwner } from "./pages/auth/AuthActions";

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            backdrop: loadingReducer,
            store: storeReducer 
        }),
        {},
        compose(applyMiddleware(thunk))
    );

    store.dispatch(verifyOwner());
    return store;
}

