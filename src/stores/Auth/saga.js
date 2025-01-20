import {
    all,
    call,
    put,
    takeLatest,
} from "redux-saga/effects";
import api from "../../utils/api";
import {
    loginSuccess,
    loginFailure,
    logoutSuccess,
    registerSuccess,
    registerFailure, logoutFailure,
    userPreferenceSuccess,
    userPreferenceFailure,
    userPreferenceSave, userPreferenceSaveSuccess, userPreferenceSaveFailure,
} from "./actions";


import {
    LOGIN,
    LOGOUT,
    REGISTER, USER_PREFERENCE, USER_PREFERENCE_SAVE
} from "./constant";

export function* fetchRegister({payload}) {
    try {
        const response = yield call(api(null, null, false)
                .post, `/auth/register`,
            payload
        );

        yield put(registerSuccess(response?.data))
        localStorage.setItem("token", response?.data?.token);
    } catch (e) {
        yield put(registerFailure(e.response?.data?.data));
    }
}

export function* fetchLogin({payload}) {
    try {
        const response = yield call(
            api(null, null, false).post,
            `/auth/login`,
            payload
        );
       yield put(loginSuccess(response?.data))
        localStorage.setItem("token", response?.data?.token);
     } catch(e) {
        yield put(loginFailure(e.response?.data?.data));
    }
}

export function* fetchLogout() {
    const token = localStorage.getItem("token");
    try {
        const response = yield call(
            api(token, null, false).post,
            `/auth/logout`);
        yield put(logoutSuccess())
        localStorage.removeItem("token");
    } catch(e) {
        yield put(logoutFailure(e.response?.data?.data));
    }
}

export function* fetchPreference() {
    const token = localStorage.getItem("token");
    try {
        const response = yield call(
            api(token, null, false).get,
            `/user/preference`);
        yield put(userPreferenceSuccess(response?.data))
    } catch(e) {
        yield put(userPreferenceFailure(e.response?.data?.data));
    }
}

export function* updatePreference({payload}) {
    const token = localStorage.getItem("token");
    try {
        const response = yield call(
            api(token, null, false).post,
            `/user/preference`, payload);
        yield put(userPreferenceSaveSuccess(response?.data))
    } catch(e) {
        yield put(userPreferenceSaveFailure(e.response?.data?.data));
    }
}

/**
 *
 * Saga flow
 */

export function* loginFlow() {
    yield takeLatest(LOGIN, fetchLogin);
}

export function* registerFlow() {
    yield takeLatest(REGISTER, fetchRegister);
}

export function* preferenceFlow() {
    yield takeLatest(USER_PREFERENCE, fetchPreference);
}

export function* preferenceUpdateFlow() {
    yield takeLatest(USER_PREFERENCE_SAVE, updatePreference);
}

export function* logoutFlow() {
    yield takeLatest(LOGOUT, fetchLogout);
}

export default function* AuthSaga() {
    yield all([
        loginFlow(),
        registerFlow(),
        logoutFlow(),
        preferenceFlow(),
        preferenceUpdateFlow(),
    ]);
}
