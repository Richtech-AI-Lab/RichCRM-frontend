import { takeLatest, put, call } from "redux-saga/effects";
import { forgotPasswordFailure, forgotPasswordSuccess, loginFailure, loginSuccess, registerFailure, registerSuccess } from "../actions/authActions";
import { FORGOT_PASSWORD_REQUEST, LOGIN_REQUEST, REGISTER_REQUEST } from "../type";
import { getRequest, postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS } from "../../constants/api";

function* login(action) {
  try {
    const { payload } = action;
    // const response = yield call(() => getRequest(API_ENDPOINTS.FETCH_DATA));
    // console.log(response,"Response...")
    // const response = yield call(() => postRequest(API_ENDPOINTS.LOGIN, payload));
    yield put(loginSuccess(payload));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

// Register Saga
function* register(action) {
  try {
    const { payload } = action;
    // const response = yield call(() => postRequest(API_ENDPOINTS.REGISTER, payload));
    yield put(registerSuccess(payload));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

// Forgot Password Saga
function* forgotPassword(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.FORGOT_PASSWORD, payload));
    yield put(forgotPasswordSuccess());
  } catch (error) {
    yield put(forgotPasswordFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);

  ;
}
