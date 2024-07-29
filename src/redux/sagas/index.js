import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import { authSaga } from "./authSaga";
import { caseSaga } from "./caseSaga";

export default function* rootSaga() {
  yield all([userSaga(), authSaga(), caseSaga()]);
}
