import { all } from "redux-saga/effects";
import AuthSaga from "./Auth/saga";
import newsAPISaga from "./NewsApi/saga";

export default function* rootSaga() {
    yield all([
        AuthSaga(),
        newsAPISaga(),
    ]);
}
