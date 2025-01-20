import * as types from "./constant";

export const initialState = {
    isLoggingIn: false,
    isAuthenticating: false,
    isLoggingOut: false,
    user: {},

    isAuthenticated: false,
    error: null,
    loginError: null,

    isRegistering:false,
    isRegistered:false,
    registerError:false,

    isPreferenceUpdating: false,
    userPreferenceData: {},
    userPreferenceError: false,

    isPreferenceFetching: false,
    isPreferenceFetchingError: false,
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER:
            return {
                ...state,
                isRegistering: true,
                registerError: null,
            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registerError: false,
                isRegistered: true,
                // isAuthenticated: true,
                // user: action.payload,
            }
        case types.REGISTER_FAILURE:
            return {
                ...state,
                isRegistering: false,
                registerError: action.payload,
            };


        case types.LOGIN:
            return {
                ...state,
                isLoggingIn: true,
                loginError: null,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isAuthenticating: false,
                isLoggingIn: false,
                user: action.payload,
                loginError: null,
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                loginError: action.error,
            };

        case types.USER_PREFERENCE:
            return {
                ...state,
                isPreferenceFetching: true,
                userPreferenceData: {},
                isPreferenceFetchingError: null,
            };
        case types.USER_PREFERENCE_SUCCESS:
            return {
                ...state,
                isPreferenceFetching: false,
                userPreferenceData: action.payload,
            };
        case types.USER_PREFERENCE_FAILURE:
            return {
                ...state,
                isPreferenceFetching: false,
                isPreferenceFetchingError: action.error,
            };

        case types.USER_PREFERENCE_SAVE:
            return {
                ...state,
                isPreferenceUpdating: true,
                userPreferenceData: {},
                userPreferenceError: null,
            };
        case types.USER_PREFERENCE_SAVE_SUCCESS:
            return {
                ...state,
                isPreferenceUpdating: false,
                userPreferenceData: action.payload,
            };

        case types.USER_PREFERENCE_SAVE_FAILURE:
            return {
                ...state,
                isPreferenceUpdating: false,
                userPreferenceError: action.error,
            };

        case types.LOGOUT:
            return {
                ...state,
                isLoggingOut: true,
                loginError: null,
            };

        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                isLoggingOut: false,
                user: {}
            };

        case types.LOGOUT_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                isLoggingOut: false,
            };
        default:
            return state;
    }
};

export default AuthReducer;
