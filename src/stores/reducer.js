import {combineReducers} from "redux";
import AuthReducer from "./Auth/reducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import NewsAPIReducer from "./NewsApi/reducer";

const authPersistConfig = {
    key: "AuthReducer",
    storage: storage,
    blacklist: ["isLoggingIn", "isAuthenticating", "isLoggingOut"],
};

const rootReducer = combineReducers({
            AuthReducer: persistReducer(authPersistConfig, AuthReducer),
            NewsAPIReducer: NewsAPIReducer,
        }
    )
;

export default rootReducer;
