import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../constants/api";
import {
  registerClientFailure,
  registerClientSuccess,
} from "../actions/clientActions";
import { REGISTER_CLIENT_REQUEST } from "../type";
import { postRequest } from "../../axios/interceptor";

function* registerClient(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_CLIENT, payload)
    );
    yield put(registerClientSuccess(response.data));
  } catch (error) {
    yield put(registerClientFailure(error.response?.data || error));
  }
}

export function* clientSaga() {
  yield takeLatest(REGISTER_CLIENT_REQUEST, registerClient);
}
