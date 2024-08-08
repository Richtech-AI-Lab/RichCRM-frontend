import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../constants/api";
import {
  registerClientFailure,
  registerClientSuccess,
} from "../actions/clientActions";
import { REGISTER_CLIENT_REQUEST } from "../type";
import { postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { registerAddressRequest } from "../actions/utilsActions";

function* registerClient(action) {
  try {
    const { payload, navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_CLIENT, payload.clientDetails)
    );
    yield put(registerClientSuccess(response.data));
    if(response.status ==200){
      yield put(registerAddressRequest(payload.addressDetails,navigate))
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
