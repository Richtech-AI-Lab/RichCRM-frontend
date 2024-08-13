import { takeLatest, put, call } from "redux-saga/effects";
import { forgotPasswordFailure, forgotPasswordSuccess, loginFailure, loginSuccess, registerFailure, registerSuccess, deleteUserSuccess, deleteUserFailure } from "../actions/authActions";
import { DELETE_USER_REQUEST, FORGOT_PASSWORD_REQUEST, LOGIN_REQUEST, REGISTER_REQUEST } from "../type";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS } from "../../constants/api";

function* login(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.LOGIN, payload));
    if (response.status == 200) {
      localStorage.setItem('authEmail', response.data.data[0].emailAddress);
    }
    yield put(loginSuccess(response?.data));
    // localStorage.setItem('authToken', response.data);
    // localStorage.setItem('authToken', response.data.token);
  } catch (error) {
    yield put(loginFailure(error.response?.data || error));
  }
}

// Register Saga
function* register(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.REGISTER, payload));
    yield put(registerSuccess(response?.data));
  } catch (error) {
    yield put(registerFailure(error.response?.data || error));
  }
}

// Forgot Password Saga
function* forgotPassword(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.FORGOT_PASSWORD, payload));
    yield put(forgotPasswordSuccess());
  } catch (error) {
    yield put(forgotPasswordFailure(error.response?.data || error));
  }
}

// Delete User Saga
function* deleteUser(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.DELETE_USER, payload));
    yield put(deleteUserSuccess(response?.data));
  } catch (error) {
    yield put(deleteUserFailure(error.response?.data || error));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}
