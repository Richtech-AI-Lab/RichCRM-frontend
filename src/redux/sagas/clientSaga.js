import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../constants/api";
import {
  registerClientFailure,
  registerClientSuccess,
} from "../actions/clientActions";
import { REGISTER_CLIENT_REQUEST } from "../type";
import { postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";

function* registerClient(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_CLIENT, payload)
    );
    yield put(registerClientSuccess(response.data));
    if(response.status ==200){
      toast.success("Client created successfully");
    }
  } catch (error) {
    yield put(registerClientFailure(error.response?.data || error));
    toast.error("Failed to create case.");
  }
}

export function* clientSaga() {
  yield takeLatest(REGISTER_CLIENT_REQUEST, registerClient);
}
