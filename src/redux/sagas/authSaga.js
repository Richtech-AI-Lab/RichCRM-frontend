import { takeLatest, put, call } from "redux-saga/effects";
import { forgotPasswordFailure, forgotPasswordSuccess, loginFailure, loginSuccess, registerFailure, registerSuccess, deleteUserSuccess, deleteUserFailure, updateUserFailure, updateUserSuccess, getAuthUserSuccess, getAuthUserFailure} from "../actions/authActions";
import { DELETE_USER_REQUEST, FORGOT_PASSWORD_REQUEST, GET_AUTH_USER_REQUEST, LOGIN_REQUEST, REGISTER_REQUEST, UPDATE_USER_REQUEST} from "../type";
import { postRequest, getRequest } from "../../axios/interceptor";
import { API_ENDPOINTS } from "../../constants/api";
import { handleError } from "../../utils/eventHandler";
import { toast } from "react-toastify";

function* login(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.LOGIN, payload));
    if (response.status == 200) {
      localStorage.setItem('authEmail', response.data.data[0].emailAddress);
      localStorage.setItem("isAuthenticated", true);
    }
    yield put(loginSuccess(response?.data));
    // localStorage.setItem('authToken', response.data);
    // localStorage.setItem('authToken', response.data.token);
  } catch (error) {
    handleError(error)
    yield put(loginFailure(error.response?.data || error));
  }
}

function* updateUser(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_USER, payload));
    if (response.status == 200) {
      yield put(updateUserSuccess(response?.data));
      toast.success("User details updated!");
    }
  } catch (error) {
    handleError(error)
    yield put(updateUserFailure(error.response?.data || error));
  }
}

// Register Saga
function* register(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.REGISTER, payload));
    const emailAddress = response?.data?.data[0]?.emailAddress;

    // Step 3: Call additional API if needed
    if (emailAddress) {
      yield call(() =>
        postRequest(API_ENDPOINTS.INITIAL_TEM_TASK, { creatorId: emailAddress })
      );
    }
    yield put(registerSuccess(response?.data));
  } catch (error) {
    handleError(error)
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
    handleError(error)
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
    handleError(error)
    yield put(deleteUserFailure(error.response?.data || error));
  }
}

// GET Auth-user Saga
function* getUserMe(action) {
  try {
    const { payload } = action;
    const response = yield call(() => getRequest(API_ENDPOINTS.ME));
    yield put(getAuthUserSuccess(response?.data));
  } catch (error) {
    handleError(error)
    // console.log("nono: ->", error);
    yield put(getAuthUserFailure(error.response?.data || error));
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
  yield takeLatest(GET_AUTH_USER_REQUEST, getUserMe);
}
