import { takeLatest, put } from "redux-saga/effects";
import { loginFailure, loginSuccess } from "../actions/authActions";
import { LOGIN_REQUEST } from "../type";

function* login(action) {
  try {
    const { payload } = action;
    yield put(loginSuccess(payload));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
