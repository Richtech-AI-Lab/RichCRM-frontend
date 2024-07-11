import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import { authSaga } from "./authSaga";

export default function* rootSaga() {
  yield all([userSaga(), authSaga()]);
}
