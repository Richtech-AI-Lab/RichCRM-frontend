import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import {
  registerAddressFailure,
  registerAddressSuccess,
} from "../actions/utilsActions";
import { REGISTER_ADDRESS_REQUEST } from "../type";
import { registerPremisesRequest } from "../actions/premisesActions";
import { toast } from "react-toastify";

function* registerAddress(action) {
  try {
    const { payload,navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ADDRESS, payload)
    );
    yield put(registerAddressSuccess(response.data));
    if(response.status ==200){
      const premisesPayload= {
        addressId :response.data?.data[0]?.addressId,
        ...payload.premisesPayload,
      }
      yield put(registerPremisesRequest(premisesPayload,navigate));
      toast.success("Address successfully registered!");
      // action.navigate(ROUTES.NEW_CASE_INFO);
    }

  } catch (error) {
    yield put(registerAddressFailure(error.response?.data || error));
    toast.error("Failed to register address.");
  }
}

export function* utilsSaga() {
  yield takeLatest(REGISTER_ADDRESS_REQUEST, registerAddress);
}
