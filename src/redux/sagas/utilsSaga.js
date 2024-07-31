import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS } from "../../constants/api";
import {
  registerAddressFailure,
  registerAddressSuccess,
} from "../actions/utilsActions";
import { REGISTER_ADDRESS_REQUEST } from "../type";

function* registerAddress(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ADDRESS, payload)
    );
    yield put(registerAddressSuccess(response.data));
  } catch (error) {
    yield put(registerAddressFailure(error.response?.data || error));
  }
}

export function* utilsSaga() {
  yield takeLatest(REGISTER_ADDRESS_REQUEST, registerAddress);
}
